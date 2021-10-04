import React, { useRef, useEffect, useState } from 'react';
import './OpenViduVideo.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function OpenViduVideo({ streamManager, avatarSize=120 }){

    const videoRef = useRef();
    const [NickName, setNickName] = useState('');    

    useEffect(() => {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
            const name = JSON.parse(streamManager?.stream.connection.data).clientData;
            setNickName(name);
        }
    }, [streamManager]);

    return(
        <>
        {streamManager !== undefined  ? (
                        <>
                            {!streamManager.stream.videoActive && 
                                <div className="avatar_area">
                                    <Avatar size={avatarSize} icon={<UserOutlined />} />
                                    <div className="video_nickname">{NickName}</div>
                                </div>}
                                
                                <video 
                                    autoPlay={true} 
                                    ref={videoRef} 
                                    data-nickname={NickName}
                                    />  
                        </>
                        
        ): null
            }
        </>
    );
};

export default OpenViduVideo;
