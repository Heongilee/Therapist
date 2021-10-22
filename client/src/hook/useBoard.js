import { useEffect, useState, useMemo } from 'react';
import useGetQuery from './useGetQuery.js'
import { useHistory } from "react-router-dom";
import boardApi from '../api/boardApi.js';
import mypageApi from '../api/mypageApi.js';


function useBoard({ PATH }) {
    
    const [BoardState, setBoardState] = useState({posts :null,currentPage:null,currentType:null,totalPage: null});
    const { page, postType } = useGetQuery();
    const history = useHistory();


    useEffect(() => {

        if (PATH === "board"){
            fetchPosts();
        } else if (PATH === "mypage") {
            fetchMypage();
        }

    }, [page, postType]);
    
    const fetchPosts = async() => {
        const response = await boardApi.fetchPosts('JOB', page);
        const { posts, totalPages, postType, totalAmount } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', 
                    totalPages: totalAmount, postType:postType });
    };

    const fetchMypage = async() => {

        const response = await mypageApi.fetchMypage(postType, page);
        const { posts,totalPage,postType } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
    };

    const categorySelect = (key) => {
        
        history.push(`/${PATH}?postType=${key}&page=${'1'}`);
    }

    const pageSelect = page => {
        console.log("postType", BoardState.postType)

        history.push(`/${PATH}?postType=${BoardState.postType}&page=${page}`);                                        
    };
    
    return { BoardState, categorySelect, pageSelect };


};

export default useBoard;
