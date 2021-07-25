import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import './MessageIcon.css';

function MessageIcon( { iconClick, clickState } ) {

    const onChange = _ => {
        iconClick(!clickState);    
    };

    return (
        <div className="messageIcon" style={{display:"inline-block"}} onClick={ onChange }>
            <MessageOutlined style={{ fontSize: '22px', marginLeft: '1rem'}} />
            <span style={{ marginLeft: '0.5rem'}}>22</span>
        </div>
    );
};

export default MessageIcon;
