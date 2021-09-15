import React from 'react';
import InputField from '../Atoms/InputField/InputField.js';
import { Modal } from 'antd';

const ModalForm = ({ title="Therapist", handleOk, handleCancel, visible, onNameHandler }) => {

  return (
    
      <Modal
        title={title} 
        centered               
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={300}
      >
        <InputField onChange={onNameHandler}/>
      </Modal>
    
  );
};

export default ModalForm;

