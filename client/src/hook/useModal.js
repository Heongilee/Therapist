import React, { useState } from 'react';
import ModalForm from '../components/Modal/ModalForm.js'
import { useHistory } from "react-router-dom";
import { modalCase } from '../utils/modalCase';
import { DELETE_MODALTEXT, STAR_MODALTEXT } from '../constants/modalConstants';
import writeApi  from '../api/writeApi.js';

function useModal() {

    const [Visible, setVisible] = useState(false);
    const [EndpointState, setEndpointState] = useState("");
    const [PathState, setPathState] = useState("");
    const [ModalType, setModalType] = useState("");

    const history = useHistory();

    const showDeleteModal = async(path, id) => {

        const endpoint = '/' + path + '/' + id;

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

    const requestAfter = async(PathState) => {
        switch(PathState) {
            
            // 질문글 삭제
            case 'posts': {
                await writeApi.fetchQuestionDelete(EndpointState);
                history.push('/board');
                return;
            } 
            // 답글 삭제
            case 'replies': {
                await writeApi.fetchAnswerDelete(EndpointState);
                window.location.reload();  //새로고침
                return;
            }
            
            // 질문글에 달린 댓글 삭제
            case 'postComments': {
                await writeApi.fetchQuestionDelete(EndpointState);
                window.location.reload();  //새로고침
                return;
            }

            // 답글에 달린 댓글 삭제
            case 'replyComments': {
                await writeApi.fetchQuestionDelete(EndpointState);
                window.location.reload();  //새로고침
                return;
            }
            
            //평점
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
