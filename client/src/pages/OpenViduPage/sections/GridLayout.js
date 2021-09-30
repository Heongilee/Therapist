import React from 'react';
import GridCard from './GridCard.js';
import { Row, Col } from 'antd';
import { useContextOpv } from '../../../hook/useContextOpv.js';

import './GridLayout.css';

const tempSpan = {
    1:[24],
    2:[12,12],
    3:[24,12,12],
    4:[12,12,12,12],
    5:[8,8,8,12,12],
    6:[8,8,8,8,8,8]
};

const PUB_SPAN = {
    1:24,
    2:12,
    3:24,
    4:12,
    5:12,
    6:8
};

const SUBS_SPAN = {
    2:[12],
    3:[12,12],
    4:[12,12,12],
    5:[12,8,8,8],
    6:[8,8,8,8,8]
};

function GridLayout() {

    // publisher, subscriber
    const { publisher, subscriber, CamerState, MicState } = useContextOpv();

    return (
        <Row gutter={[0, 32]} className="openvidu_grid_row">
            
            {/* you */}
            {publisher &&
            <Col span={PUB_SPAN[3]} className="openvidu_grid_col">
                    <GridCard streamManager={publisher} CamerState={CamerState}></GridCard>
            </Col> 
            }

            {/* other */}
            {publisher && SUBS_SPAN[3].map((data, index)=>{
                
            return <Col span={data} className="openvidu_grid_col" key={'subcard'+index}> 
                        <GridCard streamManager={publisher} CamerState={CamerState}></GridCard>
                    </Col> 
            }
            )}
                  
        </Row>
    );
};

export default GridLayout;
