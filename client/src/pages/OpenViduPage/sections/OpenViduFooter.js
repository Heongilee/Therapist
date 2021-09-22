import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Avatar, Tooltip } from 'antd';
import { useHistory } from "react-router-dom";

import { UserOutlined, VideoCameraOutlined, 
    SoundOutlined, AppstoreOutlined, ExportOutlined } from '@ant-design/icons';

import './OpenViduFooter.css';

function OpenViduFooter({onLayoutHandler}) {

    const [CamerState, setCamerState] = useState(false);
    const [MicState, setMicState] = useState(false);
    const history = useHistory();


    const onCameraHandler = () => {
        setCamerState(!CamerState);
    };

    const onMicHandler = () => {
        setMicState(!MicState);
    };

    const onCloseHandler = () => {
        history.push('/');
    };

    return (
        <div className="openvidu_footer">
                
                <Tooltip placement="top" title={<span>카메라 {CamerState ? "켜기" : "끄기"}</span>}>
                    <div className="circle" 
                        onClick={onCameraHandler}
                        style={{ background:CamerState ? "#ccc" : "#666" }}>
                        <VideoCameraOutlined/> 
                    </div>
                </Tooltip>

                <Tooltip placement="top" title={<span>마이크 {MicState ? "켜기" : "끄기"}</span>}>
                    <div className="circle"
                        onClick={onMicHandler}
                        style={{ background:MicState ? "#ccc" : "#666" }}>

                        <SoundOutlined/>
                    </div>
                </Tooltip>

                <Tooltip placement="top" title={<span>슬라이드</span>}>
                    <div className="circle" onClick={onLayoutHandler}>
                        <AppstoreOutlined/>
                    </div>
                </Tooltip>

                <Tooltip placement="top" title={<span>나가기</span>}>
                    <div className="circle" onClick={onCloseHandler}>
                        <ExportOutlined />
                    </div>
                </Tooltip>
               
            </div>
    );
};

export default OpenViduFooter;
