import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './AvaterCard.css';

function AvaterCard() {
    return (
        <div className="avater_card_wrapper">
            <div className="avater_card">
                {/* <Avatar icon={<UserOutlined />} />     */}
            </div>
        </div>
    );
};

export default AvaterCard;
