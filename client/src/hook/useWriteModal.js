import React, { useState, useRef } from 'react';
import ModalWriteForm from '../components/Modal/ModalWriteForm.js';
import { useHistory } from 'react-router-dom';
import {useContextOpv} from './useContextOpv.js';

function useWriteModal() {

    const [Visible, setVisible] = useState(false);
    const [NameState, setNameState] = useState("");
    const { joinSession } = useContextOpv();
    const history = useHistory();

    const showWriteModal = sessionId => {
        console.log("showWriteModal", sessionId);

        //joinSession(String(sessionId), NameState);
        //history.push({ pathname: "/webrtc" });

        setVisible(true);
    };

    const onNameHandler = (event) => {
        setNameState(event.currentTarget.value)
    }

    const handleOk = () => {
        localStorage.setItem("nickname", NameState);
        history.push({ pathname: "/webrtc" });
        setNameState("");
        setVisible(!Visible);
    };

    const handleCancel = () => {
        setVisible(!Visible);
        setNameState("");
    };


    const renderWriteModal = () => (
        <ModalWriteForm title={ "이름을 입력해주세요" }
                        handleOk={ handleOk } 
                        handleCancel={ handleCancel } 
                        visible= { Visible } 
                        onNameHandler={onNameHandler}
                            />
     );

     
    return { renderWriteModal, showWriteModal };
};

export default useWriteModal;