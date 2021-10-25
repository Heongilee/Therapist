import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import useQuery from './useQuery.js';

function usePushMessage() {

    const count = useSelector(state => state.socket.count);
    // const endpoint = `/notice/total/${localStorage.getItem('username')}`
    // const temp = useQuery(endpoint);
    // console.log("temp", temp)
    return { count };
};



export default usePushMessage;


