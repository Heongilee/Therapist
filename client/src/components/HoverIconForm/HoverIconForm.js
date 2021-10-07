import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { PushpinFilled,
        PushpinOutlined,
        MinusCircleOutlined, 
        SyncOutlined } from '@ant-design/icons';
    
import './HoverIconForm.css';

const HoverIconForm = ({ changeSpotlight, index, streamManager }) =>{

    const [isPush, setIsPush] = useState(false);

    return (
        <div className="hovericon">
            
                { isPush ?
                <Tooltip placement="bottom" title={<span>스포트라이트 해제</span>}>
                        <PushpinFilled 
                        onClick={() => {changeSpotlight(undefined, index); setIsPush(!isPush)}} 
                        style={{cursor:'pointer'}}/>
                </Tooltip>
                    :
                <Tooltip placement="bottom" title={<span>스포트라이트 고정</span>}>
                    <PushpinOutlined 
                        onClick={() => {changeSpotlight(streamManager, index); setIsPush(!isPush)}} 
                        style={{cursor:'pointer'}}/>
                </Tooltip>
                }
           

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
