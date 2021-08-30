import { useEffect, useState, useCallback } from 'react';
import useGetQuery from './useGetQuery.js';
import { useHistory } from "react-router-dom";
import boardApi from '../api/boardApi.js';
import mypageApi from '../api/mypageApi.js';


function useBoardState({ PATH }) {

    const [BoardState, setBoardState] = useState({ currentPage: null, postType:null });
    const { page, postType } = useGetQuery();
    const history = useHistory();

    useEffect(async() => {
        const currentPage = page ? page : 1;
        const currentType = postType ? postType : 'JOB';
        setBoardState({...BoardState, currentPage: currentPage, postType: currentType });
    }, [page, postType]);
    

    const [TotalBoard, setTotalBoard] = useState({});
    const request = useCallback(
        async() => {
            const type = postType ? postType : 'JOB';
            const response = await boardApi.fetchPosts(type);
            
            const { posts, totalAmount } = response[0];
            setTotalBoard({...TotalBoard, posts: posts, totalPages: totalAmount});
        },

        [postType],
    );
    
    useEffect(async() => {
        request();
    }, [request]);



    const categorySelect = key => {
        setBoardState({...BoardState, currentType: key });
        history.push(`/${PATH}?postType=${key}&page=${1}`);
    };

    const pageSelect = useCallback(
        (page) => {
            setBoardState({...BoardState, currentPage: page });
            history.push(`/${PATH}?postType=${BoardState.postType}&page=${page}`);
        },
    []);
    
 
    return { BoardState, categorySelect, pageSelect, TotalBoard };


};

export default useBoardState;


