import { useEffect, useRef, useState } from 'react';
import postApi from '../api/postApi.js';


function useAnswer({ postId }) {

    const currentPage = useRef(0);
    const [ AnswerState, setAnswerState ] = useState({ answerData:[], loading:false });

    const loadAnswerData = async() => {
        setAnswerState(prev => ({ ...prev, loading: true }));
        console.log("currentPage.current", currentPage.current);
        
        const data = await postApi.fetchAnswer(postId, currentPage.current);
        currentPage.current += 1;
        console.log("ddda", data)
        setAnswerState(prev => ({
        answerData: [...prev.answerData, ...data],
          loading: false
        }));
  
      };
  
    useEffect(() => {
        loadAnswerData();
    }, []);
    


    return { AnswerState:AnswerState, currentPage:currentPage, loadAnswerData };
};

export default useAnswer;


