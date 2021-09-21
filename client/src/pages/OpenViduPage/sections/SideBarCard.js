import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';


import './SideBarCard.css';

function SideBarCard({ span, publisher, onClick=null, nickName }) {
    
    return (
        <div className="sidebar_card">
            <PushpinFilled 
                        onClick={() => onClick(nickName)}/>
            <Avatar size={100} icon={<UserOutlined />} />
            <div className="sidebar_nickname">{nickName}</div>
        </div>
    );
};

export default SideBarCard;

