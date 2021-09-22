import React from 'react';
import GridCard from './GridCard.js';
import { Row, Col } from 'antd';

import './GridLayout.css';

const spanState = {
    1:[24],
    2:[12,12],
    3:[24,12,12],
    4:[12,12,12,12],
    5:[8,8,8,12,12],
    6:[8,8,8,8,8,8]
};

function GridLayout({ publisher, subscriber }) {
    return (
        <Row className="openvidu_grid_row" >
            <Col span={24} className="openvidu_grid_col">
                <GridCard></GridCard>
            </Col>       
        </Row>
    );
};

export default GridLayout;
