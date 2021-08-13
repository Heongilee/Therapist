import React, { useState } from 'react';
import ModernButton from '../../../components/atoms/ModernButton/ModernButton.js';
import AvatarField from '../../../components/atoms/AvatarField/AvatarField.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import CommentField from '../../../components/CommentField/CommentField.js';
import PaginationCmp from '../../../components/Pagination/PaginationCmp.js';
import CommentForm from '../../../components/CommentForm/CommentForm.js';
import useComment from '../../../hook/useComment.js';
import usePostData from '../../../hook/usePostData.js';
import './QuestionSection.css';

import { QuestionCircleTwoTone } from '@ant-design/icons';

const PATH = 'QUESTION';
const ROOT_INDEX = 0;
const API_ENDPOINT = 'postComments';

function QuestionSection() {

    const postData = usePostData({ PATH });
    const { commentData, CommentState, MessageIconOnClick, commentRegister } = useComment( { postData });
    
    


    return (
        <div className="question_area">
            
            {postData &&
            <div className="question_header">
                <h1><QuestionCircleTwoTone style={ { marginRight:'10px' }} 
                    twoToneColor="#52c41a" />{ postData[0].postTitle}</h1>   
            </div> }
            
            {postData &&
                <div className="question_content">
                    <div>{ postData[0].postContent}</div>   
                </div>}

            <div className="question_footer">
                <AvatarField></AvatarField>
                <div className="question_footer_reply">
                    <div className="question_footer_reply_button">
                        <ModernButton ButtonName={"답변등록"}></ModernButton>
                        <div onClick={() => MessageIconOnClick(API_ENDPOINT, ROOT_INDEX)}>
                            <MessageIcon></MessageIcon>
                        </div>
                    </div>
                </div>
            </div> 
            
            {/*   댓글 작성   */}
            
            {CommentState &&
                CommentState[ROOT_INDEX] === true ? [ 
                            <CommentForm key="CommentForm" onFinish={commentRegister}></CommentForm>,
                            <CommentField key="commentField" commentData={ commentData }></CommentField>,
                            <PaginationCmp key="PaginationCmp"/>]: null}
        </div>
    );
};

export default QuestionSection;
