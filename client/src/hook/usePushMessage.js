import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function usePushMessage() {

    const count = useSelector(state => state.socket.count);
    
    const history = useHistory();

    //Notification
    
    const noticeHendler = () => {
        console.log("하이")
        // document.body.style.overflow = "hidden";
        // history.push(`/notice`);                                        
    };

    return { count, noticeHendler };
};



export default usePushMessage;


