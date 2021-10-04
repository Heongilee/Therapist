import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/api.js';



function useVoiceRoom() {

    const [CardDataState, setCardDataState] = useState();

    const history = useHistory();

    useEffect(() => {
        
        const request = async() => {
            const endpoint = '/openvidu/sessions';
            const data = await api.fetchGetOpenvidu(endpoint, history);
            console.log("카드데이터", data);              

            if(data.length === 0){
                const dummyData = CARD_DUMMY_DATA[4].map(()=> {return {sessionTitle: '빈방이에요.'}});
                setCardDataState(dummyData);
            } else {
                if (data.length % 4 === 0){
                    setCardDataState(data);
                } else {
                    const dummyDataSize = 4 - (data.length % 4);
                    setCardDataState([...data, ...CARD_DUMMY_DATA[dummyDataSize].map(()=> {return {sessionTitle: '빈방이에요.'}})]);
                }
            }

        };

        request();

    }, [])



    return CardDataState;
};

export default useVoiceRoom;


const CARD_DUMMY_DATA = {1:[1], 2:[1,2], 3:[1,2,3],4:[1,2,3,4]}