import { useEffect, useState, useMemo } from 'react';
import useGetQuery from './useGetQuery.js'
import { useHistory } from "react-router-dom";
import boardApi from '../api/boardApi.js';


function useBoard({ PATH }) {
    
    const [BoardState, setBoardState] = useState({posts :null,currentPage:null,currentType:null,totalPage: null});
    const { page, category } = useGetQuery();
    const history = useHistory();


    useEffect(() => {

        if (PATH === "board"){
            fetchPosts();
        } else if (PATH === "mypage") {
            fetchMypage();
        }

    }, [page, category]);
    
    const fetchPosts = async() => {

        const response = await boardApi.fetchPosts(category, page);
        const { posts, totalPage, postType } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', 
                    totalPage: totalPage, currentType:postType });
    };

    const fetchMypage = async() => {

        const response = await boardApi.fetchMypage(category, page);
        const { posts,totalPage,postType } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
    };

    const categorySelect = (key) => {
        history.push(`/${PATH}?category=${key}&page=${'1'}`);
    }

    const pageSelect = page => {
        history.push(`/${PATH}?category=${BoardState.currentType}&page=${page}`);                                        
    };
    
    return { BoardState, categorySelect, pageSelect };


};

export default useBoard;
