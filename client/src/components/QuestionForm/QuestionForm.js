import React from 'react';
import ModernButton from '../atoms/ModernButton/ModernButton.js';
import AvatarField from '../atoms/AvatarField/AvatarField.js';
import MessageIcon from '../MessageIcon/MessageIcon.js';
import CommentField from '../CommentField/CommentField.js';
import PaginationCmp from '../Pagination/PaginationCmp.js';
import CommentForm from '../CommentForm/CommentForm.js';
import useComment from '../../hook/useComment.js';
import { ROOT_INDEX } from '../../constants/postPageConstants';
import { ENDPOINT_DIC } from '../../constants/modalConstants';

import { Button } from 'antd';

import './QuestionForm.css';

import { QuestionCircleTwoTone } from '@ant-design/icons';


function QuestionForm({ questionData, showDeleteModal, modifyButton }) {


    const { CommentData, CommentState, MessageIconOnClick, commentRegister } 
                                            = useComment({
                                                COMMENT_ENDPOINT:ENDPOINT_DIC['postComments'], 
                                                id:questionData[0].postId});
    
    return (
        <div className="question_area" >
            
            <div className="question_header">
                <h1><QuestionCircleTwoTone style={ { marginRight:'10px' }} 
                    twoToneColor="#52c41a" />{ questionData[0].postTitle}</h1>
                    <div className="question_header_btn" > 
                        <Button onClick={modifyButton}>수정</Button> 
                        <Button data-name={ questionData[0].postId} 
                                onClick={(event) => showDeleteModal(ENDPOINT_DIC['posts'],{event}) }>삭제</Button>
                    </div>
            </div> 
            
                <div className="question_content">
                    <div>{ questionData[0].postContent}</div>   
                </div>

            <div className="question_footer">
                <AvatarField></AvatarField>
                <div className="question_footer_reply">
                    <div className="question_footer_reply_button">
                        <ModernButton ButtonName={"답변등록"}></ModernButton>
                        <div onClick={() => MessageIconOnClick(ENDPOINT_DIC['postComments'], ROOT_INDEX)}>
                            <MessageIcon></MessageIcon>
                        </div>
                    </div>
                </div>
            </div> 
            
            {/*   댓글 작성   */}
            
            {CommentState ? [ 
                            <CommentForm key="CommentForm" onFinish={commentRegister}></CommentForm>,
                            <CommentField key="commentField" 
                            commentData={ CommentData } 
                            COMMENT_ENDPOINT={ENDPOINT_DIC['postComments']}>
                            </CommentField>,
                            <PaginationCmp key="PaginationCmp"/>]: null}
        </div>
    );
};

export default React.memo(QuestionForm);
