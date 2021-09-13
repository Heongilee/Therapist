import React from 'react';
import ModernButton from '../Atoms/ModernButton/ModernButton.js';
import AvatarField from '../Atoms/AvatarField/AvatarField.js';
import MessageIcon from '../MessageIcon/MessageIcon.js';
import CommentField from '../CommentField/CommentField.js';
import PaginationCmp from '../Pagination/PaginationCmp.js';
import CommentForm from '../CommentForm/CommentForm.js';
import WriteLinkButton from '../WriteLinkButton/WriteLinkButton.js'
import useComment from '../../hook/useComment.js';
import DropButton from '../DropButton/DropButton.js';

import { ROOT_INDEX } from '../../constants/postPageConstants';
import { ENDPOINT_DIC } from '../../constants/modalConstants';
import { Link } from "react-router-dom";

import { Button } from 'antd';

import './QuestionForm.css';

import { QuestionCircleTwoTone } from '@ant-design/icons';


function QuestionForm({ questionData, showDeleteModal, modifyButton }) {


    const { CommentData, CommentState, 
            MessageIconOnClick, commentRegister,
            pageSelect, PageState } 
                                            = useComment({
                                                COMMENT_ENDPOINT:ENDPOINT_DIC['postComments'], 
                                                id:questionData.postId,
                                                userName:questionData.userInfo.userName,
                                                });
                                                
                                            
    const questionInfo = { 
                        "type": "questionModify", "userId":questionData.userInfo.userId, 
                        "title": questionData.postTitle, "content": questionData.postContent,
                        "postId":questionData.postId,  "postType":questionData.postType, 
                        "buttonName":"수정" };

    const handleMenuClick = event => {
                if (event.key === 'delete'){
                        showDeleteModal(ENDPOINT_DIC['posts'], questionData.postId)
                }
    };


    return (
        <div className="question_area" >
            
            <div className="question_header">
            <QuestionCircleTwoTone style={ { marginRight:'10px', fontSize: '2rem' }} 
                    twoToneColor="#52c41a" />
                <h1>{ questionData.postTitle }</h1>
                    {localStorage.getItem('username') === questionData.userInfo.userName ?
                        <div> 
                                {/* 삭제, 수정 버튼 */}
                                <DropButton info={questionInfo}
                                            handleMenuClick={handleMenuClick}
                                            ENDPOINT_DIC={ENDPOINT_DIC}
                                            >
                                </DropButton>    
                        </div> : null
                    }
                    
            </div> 

                <div className="question_content">
                     { questionData.postContent.split("\n").map((line, index) => 
                     {
                        return <span key={"postContent" + index}>{line}<br /></span>
                    })}
                </div>

            <div className="question_footer">
                <AvatarField userid={questionData.userInfo.userName}
                             grade={questionData.userInfo.userGrade}></AvatarField>
                <div className="question_footer_reply">
                    <div className="question_footer_reply_button">

                    {localStorage.getItem('username') !== questionData.userInfo.userName ?
                        <Button>
                            <Link to={{pathname :`/write`,
                                data:{ type:"writeAnswer",
                                       userId:questionData.userInfo.userId,
                                       postId: questionData.postId,
                                       userName: questionData.userInfo.userName }
                            }}>답변등록</Link>
                        </Button> : null }

                        <div onClick={() => MessageIconOnClick(ENDPOINT_DIC['postComments'], ROOT_INDEX)}>
                            <MessageIcon commentCount={questionData.postComments.length}></MessageIcon>
                        </div>
                    </div>
                </div>
            </div> 
            
            {/*   댓글 작성   */}
            
            {CommentState ? [ 
                            <CommentForm key="CommentForm" onFinish={commentRegister}></CommentForm>,
                            <CommentField key="commentField"
                            showDeleteModal={showDeleteModal}
                            commentData={ CommentData } 
                            COMMENT_ENDPOINT={ENDPOINT_DIC['postComments']}>
                            </CommentField>,
                            <PaginationCmp totalPages={questionData.postComments.length} 
                                            key="PaginationCmp"
                                            pageSelect={pageSelect}
                                            currentPage={PageState}
                                            />]: null}
        </div>
    );
};

export default React.memo(QuestionForm);
