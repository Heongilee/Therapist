import React, { useState } from 'react';
import ModalRoomCreate from '../components/Modal/ModalRoomCreate.js';
import { useHistory } from 'react-router-dom';

import api from '../api/api.js';

function useCreateRoom() {
    
    const [Visible, setVisible] = useState(false);
    const [TitleState, setTitleState] = useState("");
    const [NameState, setNameState] = useState("");


    const history = useHistory();


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

        if (TitleState.length === 0){
            alert('제목을 입력해 주세요');
            return;
        }
        if (TitleState.length >= 15){
            alert('제목이 너무 길어요^^');
            return;
        }
        if (NameState.length === 0){
            alert('닉네임을 입력해 주세요')
        }
        if (NameState.length >= 8){
            alert('닉네임이 너무 길어요^^');
            return;
        }

        const endpoint='/openvidu/session';
        
        const roomInfo = { 
                        sessionTitle:TitleState,
                        sessionModerator:NameState
        };


        const { sessionId } = await api.fetchPostOpenvidu(endpoint, roomInfo, history);
        
        localStorage.setItem('nickName', NameState);
        
        //방생성시 count api 호출
        const roomEndPoint=`/openvidu/session/${String(sessionId)}/enter`;
        const response = await api.fetchRoomCount(roomEndPoint, history);
        if (response){
            setVisible(!Visible);   
            localStorage.setItem('nickName', NameState);
            // history.push(`/webrtc/${String(sessionId)}`);
            window.open(`/webrtc/${String(sessionId)}`, "", "_blank");
            
        } else {
            alert('방생성 에러');
        }
        
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

