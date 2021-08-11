import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

/**
* @param { textName:string } textName 
* @param { type:string } textName
*/

function TextButton( { textName, type=null }) {
    return (
        <Text type={ type }>{ textName }</Text>
    );
};

export default TextButton;
