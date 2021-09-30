import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './AvatarField.css';

function AvatarField({ userid='', grade=''}) {
    return (
        <div className="avater_area">
            <Avatar size="large" icon={<UserOutlined />} />
            <div className="avater_content">
                <div>
                    { userid }
                </div>
                <div>
                    { grade }
                </div>
            </div>
        </div>
    );
};

export default React.memo(AvatarField);
