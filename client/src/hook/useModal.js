import React, { useState } from 'react';
import ModalForm from '../components/Modal/ModalForm.js'
import { modalCase } from '../utils/modalCase';
import { DELETE_MODALTEXT, STAR_MODALTEXT } from '../constants/modalConstants';
import { useHistory } from 'react-router-dom';

function useModal() {

    const [Visible, setVisible] = useState(false);
    const [EndpointState, setEndpointState] = useState("");
    const [PathState, setPathState] = useState("");
    const [ModalType, setModalType] = useState("");
    const history = useHistory();


    const showDeleteModal = async(path, id) => {

        const endpoint = path + '/' + id;

        setModalType(DELETE_MODALTEXT);
        setPathState(path);
        setEndpointState(endpoint);
        setVisible(true);
    };
    

    const showStarModal = async(path, star, replyId) => {
        const endpoint = `star/${replyId}?point=${star + 1}`

        setModalType(STAR_MODALTEXT);
        setPathState(path);
        setEndpointState(endpoint);
        setVisible(true);
    };

    const handleOk = async() => {

        await modalCase(PathState, EndpointState, history);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    const renderModal = () => (
        <ModalForm modalText={ ModalType }
                            handleOk={ handleOk } 
                            handleCancel={ handleCancel } 
                            visible= { Visible } />
     );

     
    return { renderModal, showDeleteModal, showStarModal };
};

export default useModal;