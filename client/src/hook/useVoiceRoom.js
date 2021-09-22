import React, { useEffect, useState } from 'react';
import mainApi from '../api/mainApi.js';
import { useHistory } from 'react-router-dom';
import api from '../api/api.js';

function useVoiceRoom() {

    const [CardDataState, setCardDataState] = useState([]);
    const history = useHistory();

    useEffect(() => {
        
        const request = async() => {
            const endpoint = '/sessions';
            const response = await api.fetchGetOpenvidu(endpoint, history);
            console.log("방정보", response);
            // setCardDataState(response);
            //sessionId, token 
            // 
        }

        request();

    }, [])

    return CardDataState;
};

export default useVoiceRoom;
