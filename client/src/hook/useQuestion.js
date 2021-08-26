import { useEffect, useState, useRef, useCallback } from 'react';
import postApi from '../api/postApi.js';
import { useHistory } from "react-router-dom";


function useQuestion({ postId }) {

    const [QuestionData, setQuestionData] = useState();
    const history = useHistory();

    useEffect(() => {
        request();
    }, [])

    const request = useCallback(async() => {
        const data = await postApi.fetchQuestion(postId);
        setQuestionData(data);
    }, []);

    const modifyButton = () => {
        history.push(`/${PATH}?category=${key}&page=${'1'}`);
        console.log("QuestionData", QuestionData)
    };

    return { QuestionData:QuestionData, modifyButton };
};

export default useQuestion;


