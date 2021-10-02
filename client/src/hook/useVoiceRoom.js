import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CARD_DATA } from '../constants/MainPageConstants';
import api from '../api/api.js';



function useVoiceRoom() {

    const [CardDataState, setCardDataState] = useState();

    const history = useHistory();

    useEffect(() => {
        
        const request = async() => {
            const endpoint = '/openvidu/sessions';
            const data = await api.fetchGetOpenvidu(endpoint, history);
            console.log("data", data)
            //title, content, sessionId, sessionTitle, sessionId
              
            setCardDataState(data);



  
        };

        request();

    }, [])



    return CardDataState;
};

export default useVoiceRoom;
