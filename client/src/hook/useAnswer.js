import { useEffect, useRef, useState } from 'react';
import postApi from '../api/postApi.js';

function useAnswer({ postId }) {

    const currentPage = useRef(1);
    const [ AnswerState, setAnswerState ] = useState({ answerData:[], loading:false });

    const loadAnswerData = async() => {
        setAnswerState(prev => ({ ...prev, loading: true }));
        const data = await postApi.fetchAnswer(postId, currentPage.current);
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


