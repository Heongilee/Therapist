import { useState, useEffect } from 'react';
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
