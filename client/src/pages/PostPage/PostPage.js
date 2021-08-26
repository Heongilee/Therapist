import React, { useCallback, useRef } from 'react';
import QuestionForm from '../../components/QuestionForm/QuestionForm.js';
import AnswerForm from '../../components/AnswerForm/AnswerForm.js';
import useQuestion  from '../../hook/useQuestion.js';
import { useContextModal } from '../../hook/useContextModal';
import useAnswer from '../../hook/useAnswer.js';
import useInfiniteScroll from '../../hook/useInfiniteScroll';

import './PostPage.css';


function PostPage({ location }) {

    const { postId } = location;
 
    const { QuestionData, modifyButton } = useQuestion({ postId:postId });
    
    const { AnswerState, currentPage, loadAnswerData } = useAnswer({ postId:postId });

    const { showDeleteModal, renderModal } = useContextModal();

    const setTarget = useInfiniteScroll({ currentPage, loadAnswerData });

    const { answerData, loading } = AnswerState;
    

    const answerList = useCallback(() => answerData && 
    
        answerData.map( (data, index) => {
            return <AnswerForm  key={'AnswerForm' + index} data={data} index={index}
             showDeleteModal={showDeleteModal}
             postId={ postId }
             questionName={QuestionData[0].userId}>
             </AnswerForm>
        }), [answerData, currentPage])

    return (
        <section className="postPage">
            
            <div className="wrapper">
                { QuestionData &&
                    <QuestionForm questionData={QuestionData} 
                                  modifyButton={modifyButton}
                                  showDeleteModal={showDeleteModal}
                                  ></QuestionForm>}
                { answerData && answerList() }    
            </div>
            <div ref={setTarget}> {loading && "너굴너굴"}</div>
                { renderModal() }       
        </section>
    );
};


export default PostPage;

