import { useState } from 'react';
import mypageApi from '../api/mypageApi.js';


export default function useCheckBoxModal({ CheckState, postData }) {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const stateCheck = () => {
        let cnt = 0;
        for(let index = 0; index < CheckState.length; index++ ){
            if (!CheckState[index]){
                cnt += 1;
            }
        };

        if (cnt === CheckState.length) { return false; }
        else { return true };
    };

    const showDeleteModal = async() => {

        const res = await stateCheck();

        if (res){
            setVisible(true);            
        } else {
            alert("삭제할 내용을 체크해주세요")
            setVisible(false);
        }

    };

    const dataProcessing = () => {
        const deleteData = CheckState.reduce((accumulator, data, index, array) => {
            if(data){
                const { postId, replyId } = postData[index];
                accumulator[index] = postId || replyId;
                return accumulator;
            } else {
                return accumulator;
            }

         },{}) 

        return deleteData;
    };

    const handleOk = async() => {
        const checkData = await dataProcessing();


        const response = await mypageApi.fetchMypageDelete(checkData);
        if (response){
            setConfirmLoading(true);
            setVisible(false);
            setConfirmLoading(false);
            window.location.reload();  
        }       
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return { showDeleteModal, handleOk, handleCancel, visible, confirmLoading };
};


    