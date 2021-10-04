import React from 'react';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';

import './GridCard.css';

const GridCard = ({ cardHeight, streamManager }) =>{


    // audioActive
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

            <OpenViduVideo streamManager={ streamManager }></OpenViduVideo>
            
        </div>
    );
};

export default GridCard;


