import React, { useEffect, useState } from 'react';
import mainApi from '../api/mainApi.js';


function useVoiceRoom() {

    const [CardDataState, setCardDataState] = useState([]);
    
    useEffect(() => {

        const request = async() => {
            const response = await mainApi.fetchVoiceRoom();
            setCardDataState(response);
        }

        request();

    }, [])

    return CardDataState;
};

export default useVoiceRoom;
