import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';

import './GridCard.css';

const GridCard = ({ cardHeight, streamManager }) =>{
    
    // audioActive
    console.log("스트림!!", streamManager.stream.videoActive)
    return (
        <div className="grid_card" 
             style={{
                    height:cardHeight,

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

            
            {streamManager.stream.videoActive ? 

                          <OpenViduVideo streamManager={ streamManager }></OpenViduVideo>
                        : <Avatar size={120} icon={<UserOutlined />} /> 
            }
             
            {/* <div className="grid_nickname">{nickName}</div> */}
        </div>
    );
};

export default GridCard;


