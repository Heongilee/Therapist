import React, { useCallback, useRef } from 'react';
import QuestionForm from '../../components/QuestionForm/QuestionForm.js';
import AnswerForm from '../../components/AnswerForm/AnswerForm.js';
import useQuestion  from '../../hook/useQuestion.js';
import { useContextModal } from '../../hook/useContextModal';
import useAnswer from '../../hook/useAnswer.js';
import InfiniteArea from '../../components/InfiniteArea/InfiniteArea.js';
import MainImg from '../../components/MainImg/MainImg.js';


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
            <MainImg/>
            <div className="wrapper">
                { QuestionData &&
                    <QuestionForm questionData={QuestionData} 
                                  modifyButton={modifyButton}
                                  showDeleteModal={showDeleteModal}
                                  ></QuestionForm>}
                { answerData && answerList() }    
            </div>

            {QuestionData && 
                <InfiniteArea currentPage={currentPage} loadData={loadAnswerData}
                totalpage={QuestionData.replies.length} loading={loading}
                >
                </InfiniteArea>     
            } 
             { renderModal() }    
        </section>
    );
};


export default PostPage;


