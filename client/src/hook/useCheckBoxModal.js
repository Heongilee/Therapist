import React, { useState } from 'react';
import api from '../api/boardApi.js';

export default function useCheckBoxModal({ CheckState }) {

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
        const deleteData = CheckState.map((data,index) => { return data === true ? index : null })
        .filter( data => data) 
   
        return {...deleteData};
    };

    const handleOk = async() => {

        const checkData = await dataProcessing();
        const response = await api.fetchDeletePost(checkData);
        if (response){
            setConfirmLoading(true);
            setVisible(false);
            setConfirmLoading(false);
        }       
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return { showDeleteModal, handleOk, handleCancel, visible, confirmLoading };
};


    