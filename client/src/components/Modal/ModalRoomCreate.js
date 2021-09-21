import React from 'react';
import WriteForm from '../WriteForm/WriteForm.js';
import './Modal.css';


const ModalRoomCreate = ({ onFinish, onCancel, ModalState, overlayClick }) => {


  if (ModalState === false){
    return null;

  } else {
    
    return (
      <div className="modal_wrapper">
              <div className="modal_overlay" onClick={ overlayClick }>
              </div>
              <WriteForm  onFinish={ onFinish }
                onCancel={ onCancel }></WriteForm>
      </div>

    );
  };
  

};

export default ModalRoomCreate;