import React, { useState } from 'react';
import ModalWriteForm from '../components/Modal/ModalWriteForm.js';
import { useHistory } from 'react-router-dom';
import api from '../api/api.js';


function useWriteModal() {

    const [Visible, setVisible] = useState(false);
    const [NameState, setNameState] = useState("");
    const [SessionId, setSessionId] = useState("");
    const history = useHistory();

    const showWriteModal = sessionId => {
        setSessionId(String(sessionId));

        setVisible(true);
    };

    const onNameHandler = (event) => {
        setNameState(event.currentTarget.value)
    }

    const handleOk = async() => {
        console.log("NameState", NameState.length)
        if (NameState.length === 0){
            alert('닉네임을 입력해 주세요');
            return;
        }
        if (NameState.length >= 8){
            alert('닉네임이 너무 길어요^^');
            return;
        }
        
        const roomEndPoint=`/openvidu/session/${SessionId}/enter`;
        const response = await api.fetchRoomCount(roomEndPoint, history);
        setNameState("");
        setVisible(!Visible);

        if (response){
            localStorage.setItem('nickName', NameState);
            // history.push(`/webrtc/${SessionId}`);
            window.open(`/webrtc/${SessionId}`, "", "_blank");
        } else {
            alert('방인원이 초과하였습니다.');
        }
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