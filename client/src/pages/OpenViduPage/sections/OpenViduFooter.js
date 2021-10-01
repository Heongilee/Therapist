import React from 'react';
import { Tooltip } from 'antd';
import { useHistory } from "react-router-dom";
import {useContextOpv} from '../../../hook/useContextOpv';


import { UserOutlined, VideoCameraOutlined, 
    SoundOutlined, AppstoreOutlined, ExportOutlined } from '@ant-design/icons';

import './OpenViduFooter.css';

function OpenViduFooter({onLayoutHandler}) {

    const history = useHistory();

    const { leaveSession, publisher,CamerState, setCamerState,
            MicState, setMicState } = useContextOpv();

    const onCameraHandler = () => {
        publisher.publishVideo(!CamerState);

        setCamerState(!CamerState);
    };

    const onMicHandler = () => {
        publisher.publishAudio(MicState);
        setMicState(!MicState);
    };

    const onCloseHandler = () => {
        setCamerState(false)
        setMicState(false);

        history.push('/');
        leaveSession();

    };

    return (
        <div className="openvidu_footer">
                
                <Tooltip placement="top" title={<span>카메라 {!CamerState ? "켜기" : "끄기"}</span>}>
                    <div className="circle" 
                        onClick={onCameraHandler}
                        style={{ background:!CamerState ? "#ccc" : "#666" }}>
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
