import React, { useMemo, useCallback } from 'react';

import QuestionForm from '../../components/QuestionForm/QuestionForm.js';
import AnswerForm from '../../components/AnswerForm/AnswerForm.js';
import useQuestion  from '../../hook/useQuestion.js';
import { useContextModal } from '../../hook/useContextModal';
import useAnswer from '../../hook/useAnswer.js';
import useInfiniteScroll from '../../hook/useInfiniteScroll';

import './PostPage.css';


function PostPage() {

 
    const QuestionData = useQuestion();
    
    const { showDeleteModal, renderModal } = useContextModal();

    const{ AnswerState, currentPage, loadAnswerData } = useAnswer();

    const setTarget = useInfiniteScroll({ currentPage, loadAnswerData });

    const  { answerData, loading } = AnswerState;
    
    const modifyButton = () => {
    };
   
<<<<<<< HEAD
    const answerList = useCallback(() => answerData && 
=======
    const answerList = useMemo(() => answerData && 
>>>>>>> 68de9dbb152839fa1cad446a5b20a6246dc09eb8
        answerData.map( (data, index) => {
            return <AnswerForm  key={'AnswerForm' + index} data={data} index={index}
             showDeleteModal={showDeleteModal}></AnswerForm>
        }), [answerData, currentPage])

    return (
        <section className="postPage">
            
            <div className="wrapper">
                { QuestionData &&
                    <QuestionForm questionData={QuestionData} 
                                  modifyButton={modifyButton}
                                  showDeleteModal={showDeleteModal}
                                  ></QuestionForm>}
                { answerData && answerList }    
            </div>
            <div ref={setTarget}> {loading && "너굴너굴"}</div>
                { renderModal() }       
        </section>
    );
};


export default PostPage;

