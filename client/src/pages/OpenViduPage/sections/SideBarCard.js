import React from 'react';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';
import HoverIconForm from '../../../components/HoverIconForm/HoverIconForm.js';

import './SideBarCard.css';

function SideBarCard({ span, streamManager, changeSpotlight }) {
    
    return (

        <div className="sidebar_card">
     
            <HoverIconForm 
                    changeSpotlight={changeSpotlight} 
                    nickName={JSON.parse(streamManager?.stream.connection.data).clientData}
            />

            {!streamManager.stream.videoActive ? 

                    (streamManager.stream.audioActive ? 
                        <div className="side_icon">
                            <div className="side_icon_circle"> <AudioOutlined></AudioOutlined></div>
                        </div> :
                        <div className="side_icon">
                            <div className="side_icon_circle"> <AudioMutedOutlined></AudioMutedOutlined></div>
                        </div>
                        )
                : null
            }

            <OpenViduVideo 
                            streamManager={ streamManager }
                            avatarSize={90}>
                            </OpenViduVideo>
        </div>
    );
};

export default SideBarCard;

