import { useEffect, useState, useCallback } from 'react';

import boardApi from '../api/boardApi.js';

function useTotalBoard({ postType }) {

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


    return TotalBoard;
};

export default useTotalBoard;
