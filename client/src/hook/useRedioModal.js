import React, { useState } from 'react';
import ModalRedio from '../components/Modal/ModalRedio.js';


function useRedioModal() {

    const [LayoutState, setLayoutState] = useState("sidebar");
    const [ModalState, setModalState] = useState(false);

    const onLayoutHandler = () => {
        setModalState(!ModalState);
    };

    const overlayClick = () => {
        setModalState(!ModalState);
    };

    const onChange = event => {
        setLayoutState(event.target.value);
    };


    const ModalRedioRender = () => {
        return <ModalRedio overlayClick={ overlayClick }
                onChange={ onChange }
                ModalState={ ModalState }
                LayoutState={ LayoutState }></ModalRedio>
    };

    return { ModalRedioRender, onLayoutHandler, LayoutState };
};

export default useRedioModal;


