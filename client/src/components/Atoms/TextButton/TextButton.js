import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;


function TextButton( { textName, type=null }) {
    return (
        <Text type={ type }>{ textName }</Text>
    );
};

export default TextButton;
