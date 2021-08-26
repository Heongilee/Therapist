import React, { createContext } from 'react';
import useModal from '../hook/useModal.js';


export const ModalContext = createContext({
    showDeleteModal() {},
    showStarModal() {},
    useModal() {},
});

export const ModalProvider = ({ children }) => {
    
    const { renderModal, showDeleteModal, showStarModal } = useModal();

    return ( 
        <ModalContext.Provider
            value={{ renderModal, showDeleteModal, showStarModal }}>
            { children }
        </ModalContext.Provider>
     ); 
};

