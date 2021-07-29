import React from 'react';
import { Button } from 'antd';
import './WriteButton.css';
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


function WriteButton({}) {

    return (
        <div className="writeButton" >
            <Link to="/write">
                <Button><EditOutlined/>글쓰기</Button>
            </Link>
        </div>
    );
};


export default WriteButton;
