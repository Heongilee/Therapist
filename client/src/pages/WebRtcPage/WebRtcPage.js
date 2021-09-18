import React, { useState, useEffect } from 'react';
import { Row, Col,Button } from 'antd';
import useOpenVidu from '../../hook/useOpenVidu.js';
import WebCard from './WebCard.js';

import './WebRtcPage.css';

const spanState = {
    1:[24],
    2:[12,12],
    3:[24,12,12],
    4:[12,12,12,12],
    5:[8,8,8,12,12],
    6:[8,8,8,8,8,8]
}

function WebRtcPage() {


    const [state, setstate] = useState([]);
    const [cnt, setcnt] = useState(1);
    const onClick = () => {
        setcnt(cnt => cnt + 1)
    };

    const { joinSession, leaveSession, session} = useOpenVidu({nickName:localStorage.getItem('nickname')});
    
    // 임시
    useEffect(() => {
        joinSession();
    }, [])

    return (
        <section className="webrtc">
            <div className="wrapper">
                <Row className="webcard_row">
                    {session && spanState[cnt].map((value, index) => {
                        return <WebCard session={session} key={'WebCard' + index} span={value}></WebCard>
                    })}
                </Row>    
            </div>
            <Button onClick={onClick}>버어튼</Button>
        </section>
    );
};

export default WebRtcPage;
