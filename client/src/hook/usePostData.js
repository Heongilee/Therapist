import { useState, useEffect } from 'react';
import postApi from '../api/postApi.js';

function usePostData({ PATH }) {

    const [postData, setPostData] = useState();

    useEffect(() => {

        if(PATH === 'QUESTION'){
            questionRequest();
        } else {
            answerRequest();
        };

    }, []);

    const questionRequest = async() => {

        const response = await postApi.fetchQuestion();
        setPostData(response);
    };

    const answerRequest = async() => {

        const response = await postApi.fetchAnswer();
        setPostData(response);
    };

    return postData;
};

export default usePostData;
