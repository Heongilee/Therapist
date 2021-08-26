import React, { useState } from 'react';
import ModalForm from '../components/Modal/ModalForm.js'
import { useHistory } from "react-router-dom";
import { modalCase } from '../utils/modalCase';
import { DELETE_MODALTEXT, STAR_MODALTEXT } from '../constants/modalConstants';


function useModal() {

    const [Visible, setVisible] = useState(false);
    const [EndpointState, setEndpointState] = useState("");
    const [PathState, setPathState] = useState("");
    const [ModalType, setModalType] = useState("");

    const history = useHistory();

    const showDeleteModal = async(path, { event }) => {
        const id = event.currentTarget.dataset.name;
        const endpoint = path + '/' + id;

        setModalType(DELETE_MODALTEXT);
        setPathState(path);
        setEndpointState(endpoint);
        setVisible(true);
    };
    

    const showStarModal = async(path, star, replyId) => {
        // /replies/userId?point=<int> 평점 보내기
        const endpoint = `/${path}/${replyId}?point=${star + 1}`

        setModalType(STAR_MODALTEXT);
        setPathState(path);
        setEndpointState(endpoint);
        setVisible(true);
    };

    const requestAfter = (PathState) => {

        switch(PathState) {
            case 'posts': {
                history.push('/board');
                return;
            }
            case 'postComments': {
                window.location.reload();  //새로고침
                return;
            }
    
            case 'replies': {
                window.location.reload();  //새로고침
                return;
            }
    
            case 'replyComments': {
                window.location.reload();  //새로고침
                return;
            }
    
            case 'star': {
                // 스타 못누르게 설정해줘야함
                window.location.reload();  //새로고침
            }
            default:
                return;
        }
    };

    const handleOk = async() => {
        try {
            const response = await modalCase(PathState, EndpointState);

            if (response){
                requestAfter(PathState);
            }

        } catch (error) {
            console.log("error",error )
        }
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
