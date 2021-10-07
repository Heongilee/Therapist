import { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import postApi from '../api/postApi.js';


function useAnswer({ postId }) {

    const currentPage = useRef(0);
    const [ AnswerState, setAnswerState ] = useState({ answerData:[], loading:false });
    const history = useHistory();

    const loadAnswerData = async() => {
        setAnswerState(prev => ({ ...prev, loading: true }));

        const data = await postApi.fetchAnswer(postId, currentPage.current, history);

        currentPage.current += 1;

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


