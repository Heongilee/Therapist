import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './WriteButton.css';

function WriteButton({}) {

    return (
        <div className="writeButton" >
            <Link to={{ pathname: `/write`, 
                    data:{ type:"writeQuestion",userId: localStorage.getItem('username') }}}>
                <Button><EditOutlined/>글쓰기</Button>
            </Link>
        </div>
    );
};


export default React.memo(WriteButton);
