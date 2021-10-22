import React from 'react';
import { AudioOutlined, AudioMutedOutlined, UserOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';
import { Avatar } from 'antd';
import { motion } from "framer-motion";

import './GridCard.css';

const GridCard = ({ cardHeight, streamManager }) =>{

    const variants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
      };

    return (
        <>
        {streamManager !== undefined  ?
        (<motion.div 
            layout
            variants={variants}
            initial="closed"
            animate="open"
            className="grid_card" 
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
            
        </motion.div>) : 
        <motion.div 
                layout
                variants={variants}
                initial="closed"
                animate="open"
                className="grid_card" 
                style={{
                    height:cardHeight,
                    }}
                >

            <div className="avatar_area">
                <Avatar size={110} icon={<UserOutlined />} /> 
            </div>
        </motion.div>
        }
        </>
    );
};

export default GridCard;


