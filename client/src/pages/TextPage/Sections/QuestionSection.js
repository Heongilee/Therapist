import React from 'react';
import './css/QuestionSection.css';
import ModernButton from '../../../components/ModernButton/ModernButton.js';
import AvatarField from '../../../components/AvatarField/AvatarField.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import { QuestionCircleTwoTone } from '@ant-design/icons';

function QuestionSection({ questionData }) {


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
                    <ModernButton ButtonName={"답변등록"}></ModernButton>
                    <MessageIcon></MessageIcon>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
