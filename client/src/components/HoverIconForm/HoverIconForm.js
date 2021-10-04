import React from 'react';
import { Tooltip } from 'antd';
import { PushpinFilled, 
        MinusCircleOutlined, 
        SyncOutlined } from '@ant-design/icons';
    
import './HoverIconForm.css';

const HoverIconForm = ({ changeSpotlight, nickName }) =>{

    return (
        <div className="hovericon">
            <Tooltip placement="bottom" title={<span>고정</span>}>
                <PushpinFilled onClick={() => changeSpotlight(nickName)} style={{cursor:'pointer'}}/>
            </Tooltip>

            <Tooltip placement="bottom" title={<span>기능미정</span>}>
                <SyncOutlined style={{
                    cursor:'pointer',
                    margin:'0 0.8rem 0 0.8rem'
                    }}/>
            </Tooltip>

            <Tooltip placement="bottom" title={<span>기능미정</span>}>
                <MinusCircleOutlined style={{cursor:'pointer'}}/>  
            </Tooltip>
        </div>
    );
};

export default HoverIconForm;
