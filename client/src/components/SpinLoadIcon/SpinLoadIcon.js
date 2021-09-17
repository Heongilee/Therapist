import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './SpinLoadIcon.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24}} spin />;

function SpinLoadIcon() {
    return (
        <div className="spin_area">
        <Spin indicator={antIcon}  />
        </div>
    );
};

export default SpinLoadIcon;
