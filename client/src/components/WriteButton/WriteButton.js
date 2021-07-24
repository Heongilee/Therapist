import React from 'react';
import { Button } from 'antd';
import './WriteButton.css';
import { EditOutlined } from '@ant-design/icons';


function WriteButton() {

    return (
        <div className="writeButton">
            <Button><EditOutlined/>글쓰기</Button>
        </div>
    );
};


export default WriteButton;
