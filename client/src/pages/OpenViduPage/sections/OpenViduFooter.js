import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Avatar, Tooltip } from 'antd';

import { UserOutlined, VideoCameraOutlined, 
    SoundOutlined, AppstoreOutlined } from '@ant-design/icons';

import './OpenViduFooter.css';

function OpenViduFooter({onLayoutHandler}) {

    const [CamerState, setCamerState] = useState(false);
    const [MicState, setMicState] = useState(false);

    const onCameraHandler = () => {
        setCamerState(!CamerState);
    };

    const onMicHandler = () => {
        setMicState(!MicState);
    };

    return (
        <div className="openvidu_footer">
                
                <Tooltip placement="bottom" title={<span>카메라 {CamerState ? "켜기" : "끄기"}</span>}>
                    <div className="circle" 
                        onClick={onCameraHandler}
                        style={{ background:CamerState ? "#ccc" : "#666" }}>
                        <VideoCameraOutlined/> 
                    </div>
                </Tooltip>

                <Tooltip placement="bottom" title={<span>마이크 {MicState ? "켜기" : "끄기"}</span>}>
                    <div className="circle"
                        onClick={onMicHandler}
                        style={{ background:MicState ? "#ccc" : "#666" }}>

                        <SoundOutlined/>
                    </div>
                </Tooltip>

                <Tooltip placement="bottom" title={<span>슬라이드</span>}>
                    <div className="circle" onClick={onLayoutHandler}>
                        <AppstoreOutlined/>
                    </div>
                </Tooltip>

            </div>
    );
};

export default OpenViduFooter;
