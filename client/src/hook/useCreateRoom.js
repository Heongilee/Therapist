import React, { useState } from 'react';
import ModalWriteForm from '../components/Modal/ModalWriteForm.js';
import {useContextOpv} from './useContextOpv.js';
import { useHistory } from 'react-router-dom';

import api from '../api/api.js';

function useCreateRoom() {
    
    const [Visible, setVisible] = useState(false);;
    const [RoomState, setRoomState] = useState("");
    const history = useHistory();

    const { joinSession, setFirstState } = useContextOpv();


    const showCrearteRoomModal = () => {
        setVisible(true);
    };

    const onCreateRoomHandler = (event) => {
        setRoomState(event.currentTarget.value);
    }

    const handleOk = async() => {

        const endpoint='/sessions';
        const response = await api.fetchGetOpenvidu(endpoint, history);
        console.log("방정보", response);
        
        const temp = response.content.filter(data  => {
            return data.id === RoomState
        })

        if (temp.length){
            alert('중복된 방제목입니다.')
        } else {
            joinSession(RoomState);
            history.push('/webrtc');
        }

        setVisible(!Visible);   
    };

    const handleCancel = () => {
        setVisible(!Visible);

        setRoomState("");
    };

    const renderRoomCreate = () => (
        <ModalWriteForm title={ "방제목을 입력해주세요" }
                        handleOk={ handleOk } 
                        handleCancel={ handleCancel } 
                        visible= { Visible } 
                        onNameHandler={onCreateRoomHandler}
                            />
     );

    return { renderRoomCreate, showCrearteRoomModal };
};

export default useCreateRoom;



// import React, { useState } from 'react';
// import ModalRoomCreate from '../components/Modal/ModalRoomCreate.js';

// function useCreateRoom() {
    
//     const [ModalState, setModalState] = useState(false);

//     const onClick = () => {
//         setModalState(!ModalState);
//     };

//     const overlayClick = () => {
//         setModalState(!ModalState);
//     };

//     const onFinish = (values) => {
//         const { title, content } = values;
//         // api 요청해야함
//     };

//     const onCancel = () => {
//         setModalState(!ModalState);
//     };

//     const ModalRoomRender = () => {
//         return <ModalRoomCreate overlayClick={ overlayClick }
//                 onFinish={ onFinish }
//                 onCancel={ onCancel }
//                 ModalState={ ModalState }></ModalRoomCreate>
//     };

//     return { ModalRoomRender, onClick };
// };

// export default useCreateRoom;
