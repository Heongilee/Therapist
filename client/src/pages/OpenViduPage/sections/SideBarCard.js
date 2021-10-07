import React, { useState } from 'react';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';
import HoverIconForm from '../../../components/HoverIconForm/HoverIconForm.js';
import { motion } from 'framer-motion';

import './SideBarCard.css';

function SideBarCard({ streamManager, changeSpotlight, index }) {
    
    const variants = {
        open: { 
            opacity: 1,
        },
        closed: { 
            opacity: 0,
        }
    };

    console.log("인덱스 바뀌는지 확인!", index)

    return (                                

        <motion.div className="sidebar_card"
                    layout
                    variants={variants}
                    initial="closed"
                    animate="open"
                    >
     
            <HoverIconForm 
                    index={index}
                    changeSpotlight={changeSpotlight}
                    streamManager={streamManager}
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
        </motion.div>
    );
};

export default SideBarCard;

