import React, {useEffect, useState, useMemo} from 'react';
import useGetQuery from './useGetQuery.js'
import { useHistory } from "react-router-dom";
import api from '../api/boardApi.js';


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

        const response = await api.fetchPosts(category, page);
        const { posts, totalPage, postType } = response[0];
                setBoardState({...BoardState, posts:posts,
                    currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
    };

    const fetchMypage= async() => {

        const response = await api.fetchMypage(category, page);
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

// import React, {useEffect, useState} from 'react';
// import useGetQuery from './useGetQuery.js'
// import { useHistory } from "react-router-dom";
// import api from '../api/boardApi.js';


// function useBoard({ PATH }) {
    
//     const [BoardState, setBoardState] = useState({posts :null,currentPage:null,currentType:null,totalPage: null});
//     const { page, category } = useGetQuery();

//     const history = useHistory();


//     useEffect(() => {

//         if (PATH === "board"){
//             fetchPosts();
//         } else if (PATH === "mypage") {
//             fetchMypage();
//         }

//     }, [page, category]);
    
//     const fetchPosts = async() => {

//         const response = await api.fetchPosts(category, page);
//         const { posts,totalPage,postType } = response[0];
//                 setBoardState({...BoardState, posts:posts,
//                     currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
//     };

//     const fetchMypage= async() => {

//         const response = await api.fetchMypage(category, page);
//         const { posts,totalPage,postType } = response[0];

//                 setBoardState({...BoardState, posts:posts,
//                     check:Array(posts.length).fill(false),
//                     currentPage:page ? parseInt(page) : '1', totalPage: totalPage, currentType:postType });
//     };


//     const categorySelect = (key) => {
//         history.push(`/${PATH}?category=${key}&page=${BoardState.currentPage}`);
//     }

//     const pageSelect = page => {
//         history.push(`/${PATH}?category=${BoardState.currentType}&page=${page}`);                                        
//     };
    

//     const checkBoxhandler = event => {
//         const postNum = event.target.dataSet;

//         const initialState = BoardState.check.map((check, index) => (postNum === index ? !check : check));

//         setBoardState({...BoardState, check:initialState });
//     }

//     const handleButtonClick = () => {
//         console.log("버튼클릭",BoardState.check );
//     };

//     return { BoardState, categorySelect, pageSelect, handleButtonClick, checkBoxhandler };


// };

// export default useBoard;