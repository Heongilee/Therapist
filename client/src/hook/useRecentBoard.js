import { useState, useEffect } from 'react';
import useQuery from './useQuery.js';
import mainApi from '../api/mainApi.js';

function useRecentBoard() {

    const [PostState, setBoardState] = useState(null);
    
    useEffect(() => {
        fetchRecentBoard();
    }, []);

    const fetchRecentBoard = async () => {
        
        const response = await mainApi.fetchRecentBoard();
        setBoardState(response);
    };



    return PostState;

};

export default useRecentBoard;


// import { useState, useEffect, useCallback } from 'react';
// import useQuery from './useQuery.js';
// import mainApi from '../api/mainApi.js';

// const url = 'http://localhost:8080/api/main/posts';
// function useRecentBoard() {
//     // const [PostState, setBoardState] = useState(null);
//     const temp = useQuery(url)
  
//     return temp;
//     // return PostState;

// };

// export default useRecentBoard;


// import { useState, useEffect } from 'react';
// import useQuery from './useQuery.js';
// import mainApi from '../api/mainApi.js';

// function useRecentBoard() {

//     const [PostState, setBoardState] = useState(null);
    
//     useEffect(() => {
//         fetchRecentBoard();
//     }, []);

//     const fetchRecentBoard = async () => {
        
//         const response = await mainApi.fetchRecentBoard();
//         setBoardState(response);
//     };



//     return PostState;

// };

// export default useRecentBoard;
