import React from 'react';
import GridCard from './GridCard.js';
import { Row, Col } from 'antd';
import { useContextOpv } from '../../../hook/useContextOpv.js';

import './GridLayout.css';



function GridLayout({ publisher, subscriber }) {

    
    const { CamerState, MicState, RoomState } = useContextOpv();

    return (
        <Row justify="space-around" align="middle" className="openvidu_grid_row">
            
            {/* you */}
            {publisher &&
            <Col span={PUB_SPAN[subscriber.length + 1]} className="openvidu_grid_col">
                    <GridCard streamManager={publisher} 
                                CamerState={CamerState}
                                cardHeight={CARD_HEIGHT[subscriber.length + 1]}
                                ></GridCard>

            </Col> 
            }

            {/* other */}
            {subscriber.length && subscriber.map((data, index) => {
                
            return <Col span={SUBS_SPAN[subscriber.length + 1]} className="openvidu_grid_col" key={'subcard'+index}> 
                        <GridCard streamManager={data} 
                        CamerState={CamerState}
                        cardHeight={CARD_HEIGHT[subscriber.length + 1]}

                        ></GridCard>
                   </Col> 
            }
            )}

        </Row>
    );
};

export default GridLayout;

const PUB_SPAN = {
    1:24,
    2:12,
    3:8,
    4:8,
    5:8,
    6:8
};

const SUBS_SPAN = {
    2:12,
    3:8,
    4:8,
    5:8,
    6:8

};

const CARD_HEIGHT = {
    1:'700px',
    2:'700px',
    3:'360px',
    4:'360px',
    5:'360px',
    6:'360px'
};