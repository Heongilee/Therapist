import React from 'react';
import { Modal, Input } from 'antd';

const ModalForm = ({ title="Therapist", handleOk, handleCancel, visible, onNameHandler }) => {

  return (
    
      <Modal 
        className="modal_create_room"
        title={title} 
        centered               
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={300}
      >
        <Input placeholder="닉네임을 입력해 주세요" onChange={onNameHandler}/>
      </Modal>
    
  );
};

export default ModalForm;

