import React from 'react';
import ModernButton from '../atoms/ModernButton/ModernButton.js';
import { Modal } from 'antd';

const DeleteModal = ({ title="Therapist",modalText, handleOk, handleCancel, showModal, confirmLoading, visible }) => {

    
  return (
    <>
      <ModernButton ButtonName={"삭제"} handleButtonClick={ showModal }></ModernButton>

      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;

