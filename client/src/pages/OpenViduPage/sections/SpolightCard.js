import React from 'react';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';
import { motion } from "framer-motion";

import './SpolightCard.css';

const SpolightCard = ({ cardHeight, streamManager }) =>{

    const variants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
      };

    return (
        <motion.div 
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
            
        </motion.div>
    );
};

export default SpolightCard;


