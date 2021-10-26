import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import api from '../api/api.js'

function usePushMessage({ LoginState }) {
    const history = useHistory();
    const count = useSelector(state => state.socket.count);
    const [Count, setCountState] = useState(count);

    useEffect(async() => {
        if (LoginState){
            const endpoint = `notice/total/${localStorage.getItem('username')}`;
            const response = await api.fetchGet(endpoint, history);
            setCountState(count => count + response);
        }
        
    }, [LoginState]);
    
    return { count:Count, setCountState };
};



export default usePushMessage;


