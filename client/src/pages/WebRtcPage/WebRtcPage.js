import React, { useState } from 'react';
import { Row, Col,Button } from 'antd';
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

    

    return (
        <section className="webrtc">
            <div className="wrapper">
                <Row className="webcard_row">
                    {spanState[cnt].map((value, index) => {
                        return <WebCard key={'WebCard' + index} span={value}></WebCard>
                    })}
                </Row>    
            </div>
            <Button onClick={onClick}>버어튼</Button>
        </section>
    );
};

export default WebRtcPage;
