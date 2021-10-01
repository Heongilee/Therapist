import React, { useState, useEffect } from 'react';
import ModalRoomCreate from '../components/Modal/ModalRoomCreate.js';
import {useContextOpv} from './useContextOpv.js';
import { useHistory } from 'react-router-dom';

import api from '../api/api.js';

function useCreateRoom() {
    
    const [Visible, setVisible] = useState(false);
    const [TitleState, setTitleState] = useState("");
    const [NameState, setNameState] = useState("");


    const history = useHistory();

    const { joinSession } = useContextOpv();



    const showCrearteRoomModal = () => {

        setVisible(true);
    };

    const onTitleHandler = (event) => {
        setTitleState(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setNameState(event.currentTarget.value);
    }
    
    const handleOk = async() => {

        const endpoint='/openvidu/session';
        const titleData = { sessionTitle:TitleState };
        const { sessionId } = await api.fetchPostOpenvidu(endpoint, titleData, history);
        
        joinSession(String(sessionId), NameState);
        history.push('/webrtc');
        setVisible(!Visible);   
    };

    const handleCancel = () => {
        setVisible(!Visible);
        setTitleState("");
        setNameState("");
    };

    const renderRoomCreate = () => (
        <ModalRoomCreate title={ "방제목 이름을 입력해주세요" }
                        handleOk={ handleOk } 
                        handleCancel={ handleCancel } 
                        visible= { Visible } 
                        onTitleHandler={onTitleHandler}
                        onNameHandler={onNameHandler}
                        />
     );

    return { renderRoomCreate, showCrearteRoomModal };
};

export default useCreateRoom;

