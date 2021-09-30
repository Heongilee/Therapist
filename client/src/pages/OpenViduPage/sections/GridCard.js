import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';

import './GridCard.css';

function GridCard({ span, streamManager, onClick=null, nickName=null, CamerState }) {
    
    // audioActive
    //console.log("스트림!!", streamManager.stream.videoActive)
    return (
        <div className="grid_card" 
             style={{ 
                    backgroundColor: streamManager.stream.videoActive ? '#000' : '#4e4e4e'}}>
            

            {!streamManager.stream.videoActive ? 

                    (streamManager.stream.audioActive ? 
                        <div className="grid_icon">
                            <div className="grid_icon_circle"> <AudioOutlined></AudioOutlined></div>
                        </div> :
                        <div className="grid_icon">
                            <div className="grid_icon_circle"> <AudioMutedOutlined></AudioMutedOutlined></div>
                        </div>
                        )
                : null
            }

            
            {!CamerState && streamManager.stream.videoActive ? 
                          <OpenViduVideo streamManager={ streamManager }></OpenViduVideo>
                        : <Avatar size={120} icon={<UserOutlined />} /> 
            }
             
            {/* <div className="grid_nickname">{nickName}</div> */}
        </div>
    );
};

export default GridCard;


