import { useEffect, useState } from 'react';
import postApi from '../api/postApi.js';


function useQuestion() {

    const [QuestionData, setQuestionData] = useState();

    useEffect(() => {
        request();
    }, []);

    const request = async() => {
        const data = await postApi.fetchQuestion();
        setQuestionData(data);
    };
    
    return QuestionData;

};

export default useQuestion;

