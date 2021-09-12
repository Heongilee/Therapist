import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import './MessageIcon.css';

function MessageIcon( {commentCount = 0} ) {

    return (
        <div className="messageIcon" >
            <MessageOutlined style={{ fontSize: '22px', marginLeft: '1rem'}} />
            <span style={{ marginLeft: '0.5rem'}}>{ commentCount }</span>
        </div>
    );
};

export default MessageIcon;
