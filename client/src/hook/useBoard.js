import React, {useEffect, useState} from 'react';
import useGetQuery from './useGetQuery.js'
import { useHistory } from "react-router-dom";
import {requestBoardList} from '../api/boardApi.js';

import BoardForm from '../components/BoardForm/BoardForm.js'

// url type, datainfo
function useBoard({ PATH }) {
    
    const [BoardState, setBoardState] = useState({posts :null,currentPage:null,currentType:null,totalPage: null});
    const { page, category } = useGetQuery();
    const history = useHistory();


    useEffect(() => {
        requestBoardList(category, page)
            .then(response => {
                const { posts,totalPage,postType } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
            });
    
    }, [page]);
    
    const categorySelect = (key) => {
        history.push(`/${PATH}?category=${key}&page=${BoardState.currentPage}`);
        // setBoardState({...BoardState, currentType:key});
    }

    const pageSelect = page => {
        history.push(`/${PATH}?category=${BoardState.currentType}&page=${page}`);                                        
        // setBoardState({...BoardState, currentPage:page});
    };
    
    const renderPosts = () => (
        BoardState.posts && <BoardForm postData={BoardState.posts}></BoardForm>
    )

    //버튼 추가 및 버튼 이벤트
    
    return {BoardState, renderPosts, categorySelect, pageSelect };


};

export default useBoard;

 

// import {useEffect, useState} from 'react';
// import useGetQuery from './useGetQuery.js'
// import { useHistory } from "react-router-dom";
// import {requestBoardList} from '../api/boardApi.js';


// // url type, datainfo
// function useBoard() {
    
//     const [BoardState, setBoardState] = useState({post :null,currentPage:null,currentType:null,totalPage: null});
//     const { page, category } = useGetQuery();
//     const history = useHistory();


//     // url 정보
//     useEffect(() => {
//         requestBoardList(category, page)
//         .then(response => {
//             const { posts,totalPage,postType } = response[0];
//             setBoardState({...BoardState, post:posts,
//                 currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
//         });
 
//     }, [page]);
    
//     const categorySelect = (key) => {
//         history.push(`/board?category=${key}&page=${BoardState.currentPage}`);
//         setBoardState({...BoardState, currentType:key});
//     }

//     const pageChange = page => {
//         history.push(`/board?category=${BoardState.currentType}&page=${page}`);                                        
//         // setBoardState({...BoardState, currentPage:page});
//     };
    
//     //버튼 추가 및 버튼 이벤트
//     //render 추가

//     return { BoardState:BoardState, pageChange, categorySelect };
// };

// export default useBoard;