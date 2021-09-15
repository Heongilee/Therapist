import React, { useState } from 'react';
import { Row, Col,Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './WebCard.css';

function WebCard({ span }) {

    return (
        <Col span={ span } className="webcard_col">
                <div className="webrtc_card">
                    <Avatar size={150} icon={<UserOutlined />} />
                </div>
        </Col>
    );
};

export default WebCard;
