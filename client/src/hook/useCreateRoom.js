import React, { useState } from 'react';
import ModalRoomCreate from '../components/Modal/ModalRoomCreate.js';

function useCreateRoom() {
    
    const [ModalState, setModalState] = useState(false);

    const onClick = () => {
        setModalState(!ModalState);
    };

    const overlayClick = () => {
        setModalState(!ModalState);
    };

    const onFinish = (values) => {
        const { title, content } = values;
        // api 요청해야함
    };

    const onCancel = () => {
        setModalState(!ModalState);
    };

    const ModalRoomRender = () => {
        return <ModalRoomCreate overlayClick={ overlayClick }
                onFinish={ onFinish }
                onCancel={ onCancel }
                ModalState={ ModalState }></ModalRoomCreate>
    };

    return { ModalRoomRender, onClick };
};

export default useCreateRoom;
