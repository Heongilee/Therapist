import useQuery from './useQuery.js';
import { MAIN_ENDPOINT } from '../config/confing.js';

function useRecentBoard() {

    const PostState = useQuery(MAIN_ENDPOINT);
  
    return PostState;

};

export default useRecentBoard;



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


