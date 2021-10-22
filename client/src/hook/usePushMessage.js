import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function usePushMessage() {

    const count = useSelector(state => state.socket.count);

    return { count };
};



export default usePushMessage;


