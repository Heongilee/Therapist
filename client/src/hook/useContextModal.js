import { useContext } from 'react';
import { ModalContext } from '../context/modalContext';


export const useContextModal = () => {
    return useContext(ModalContext);
};