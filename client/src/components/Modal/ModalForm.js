import React from 'react';
import { Modal } from 'antd';

const ModalForm = ({ title="Therapist",modalText, handleOk, handleCancel, visible }) => {

  return (
    
      <Modal
        title={title}                 
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    
  );
};

export default ModalForm;

// export default React.memo(ModalForm);

