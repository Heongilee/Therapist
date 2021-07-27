import React from 'react';
import TextField from '../atoms/TextField/TextField.js';
import ModernButton from '../atoms/ModernButton/ModernButton.js';
import './ReplyField.css';


function ReplyField() {
    return (
        <div className="reply_area">
            <TextField placeholder={ "댓글을 작성하세요" }></TextField>
            <div className="reply_button">
                <ModernButton ButtonName={ "댓글 작성" }></ModernButton>
            </div>
        </div>
    );
};

export default ReplyField;
