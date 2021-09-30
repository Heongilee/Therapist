import React, { useState } from 'react';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined, PushpinFilled, 
    PushpinOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';


import './SideBarCard.css';

function SideBarCard({ span, streamManager, onClick=null, nickName }) {
    
    return (
        <div className="sidebar_card">
            {/* <Tooltip placement="bottom" title={<span>고정</span>}>
                <PushpinFilled onClick={() => onClick(nickName)}/>
            </Tooltip> */}
            {/* <OpenViduVideo streamManager={ streamManager }></OpenViduVideo> */}
            <Avatar size={90} icon={<UserOutlined />} />
            {/* <div className="sidebar_nickname">{nickName}</div> */}
        </div>
    );
};

export default SideBarCard;

