import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CARD_DATA } from '../constants/MainPageConstants';
import api from '../api/api.js';



function useVoiceRoom() {

    const [CardDataState, setCardDataState] = useState();

    const history = useHistory();

    useEffect(() => {
        
        const request = async() => {
            const endpoint = '/sessions';
            const { numberOfElements, content } = await api.fetchGetOpenvidu(endpoint, history);
            
            console.log("카드정보", numberOfElements, content);
            if (numberOfElements === 0) {
                setCardDataState(CARD_DATA);
            }

        };

        request();

    }, [])



    return CardDataState;
};

export default useVoiceRoom;
