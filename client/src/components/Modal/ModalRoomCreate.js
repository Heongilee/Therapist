import React, { useEffect } from 'react';
import InputField from '../Atoms/InputField/InputField.js';
import { Input } from 'antd';

import { Modal } from 'antd';

const ModalRoomCreate = ({ 
    title="Therapist", handleOk, handleCancel, 
    visible, 
    onTitleHandler,
    onNameHandler 
  }) => {
    
  return (
    
      <Modal
        className="modal_create_room"
        title={title} 
        centered               
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={360}

      >

        <Input style={{marginBottom:'10px', borderRadius:'10px'}} 
        placeholder="제목을 입력해주세요" onChange={onTitleHandler}/>

        <Input style={{ borderRadius:'10px'}} 
        placeholder="이름을 입력해 주세요" onChange={onNameHandler}/>

      </Modal>
    
  );
};

export default ModalRoomCreate;


