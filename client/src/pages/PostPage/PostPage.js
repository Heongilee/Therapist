import React, { useCallback, useRef } from 'react';
import QuestionForm from '../../components/QuestionForm/QuestionForm.js';
import AnswerForm from '../../components/AnswerForm/AnswerForm.js';
import useQuestion  from '../../hook/useQuestion.js';
import { useContextModal } from '../../hook/useContextModal';
import useAnswer from '../../hook/useAnswer.js';

import AnswerArea from './AnswerArea.js';

import './PostPage.css';


function PostPage({ match }) {

    const postId = useRef(match.params.postId);

    const { QuestionData, modifyButton } = useQuestion({ postId:postId.current });

    const { AnswerState, currentPage, loadAnswerData } = useAnswer({ postId:postId.current });

    const { showDeleteModal, renderModal } = useContextModal();

    const { answerData, loading } = AnswerState;
    

    const answerList = useCallback(() => answerData && 
        answerData.map( (data, index) => {
            return <AnswerForm  key={'AnswerForm' + index} data={data} index={index}
                                showDeleteModal={showDeleteModal}
                                postId={ postId.current }
                                questId= {QuestionData && QuestionData.userInfo.userName}
                                >
             </AnswerForm>
        }), [answerData, currentPage, QuestionData])

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

            {QuestionData && 
                <AnswerArea currentPage={currentPage} loadAnswerData={loadAnswerData}
                totalpage={QuestionData.replies.length} loading={loading}
                >
                </AnswerArea>     
            } 
                {/* <div ref={setTarget}> {loading && "loading..."}</div> */}
             { renderModal() }    
        </section>
    );
};


export default PostPage;


