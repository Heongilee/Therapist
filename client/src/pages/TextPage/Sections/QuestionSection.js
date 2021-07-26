import React from 'react';
import './css/QuestionSection.css';
import ModernButton from '../../../components/atoms/ModernButton/ModernButton.js';
import AvatarField from '../../../components/atoms/AvatarField/AvatarField.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import CommentField from '../../../components/CommentField/CommentField.js';
import PaginationCmp from '../../../components/Pagination/PaginationCmp.js';
import ReplyField from '../../../components/ReplyField/ReplyField.js';

import { QuestionCircleTwoTone } from '@ant-design/icons';

function QuestionSection({ questionData, commentData, rootReplyState, rootReplyOnClick }) {


    return (
        <div className="question_area">
            <div className="question_header">
                <h1><QuestionCircleTwoTone style={ { marginRight:'10px' }} twoToneColor="#52c41a" />{ questionData[0].title}</h1>   
            </div>
            
            <div className="question_content">
                <div>{ questionData[0].content }</div>   
            </div>

            <div className="question_footer">
                <AvatarField></AvatarField>
                <div className="question_footer_reply">
                    <div className="question_footer_reply_button">
                        <ModernButton ButtonName={"답변등록"}></ModernButton>
                        <div onClick={() => rootReplyOnClick()}>
                            <MessageIcon></MessageIcon>
                        </div>
                    </div>
                </div>
            </div>
            { rootReplyState === true ? [ 
                            <ReplyField key="replyField"></ReplyField>,
                            <CommentField key="commentField" commentData={ commentData }></CommentField>,
                            <PaginationCmp key="PaginationCmp"/>]: ''}
        </div>
    );
};

export default QuestionSection;
