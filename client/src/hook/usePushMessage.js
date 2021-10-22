import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


function usePushMessage() {

    const count = useSelector(state => state.socket.count);
    
    console.log("state", count)
    const history = useHistory();

    //Notification
    
    const noticeHendler = () => {
        history.push(`/notice`);                                        
    };

    return { count, noticeHendler };
};



export default usePushMessage;


