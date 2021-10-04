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

        const roomEndPoint=`/openvidu/session/${SessionId}/enter`;
        const response = await api.fetchRoomCount(roomEndPoint, history);
        setNameState("");
        setVisible(!Visible);

        if (response){
            localStorage.setItem('nickName', NameState);
            history.push(`/webrtc/${SessionId}`);
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