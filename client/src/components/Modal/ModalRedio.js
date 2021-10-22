import React from 'react';
import { Radio, Input, Space } from 'antd';

import './Modal.css';


const ModalRedio = ({ onChange, ModalState, overlayClick, LayoutState }) => {


  if (ModalState === false){
    return null;

  } else {
    
    return (
      <div className="modal_wrapper">
        <div className="modal_overlay" onClick={ overlayClick }>
        </div>
        
        <div className="modal_redio_container">
            
            <div>
                <p>레이아웃 변경</p>
            </div>

            <Radio.Group onChange={onChange} value={LayoutState}>
                <Space direction="vertical">
                <Radio value={"grid"}>그리드</Radio>
                <Radio value={"sidebar"}>사이드바</Radio>
                </Space>
            </Radio.Group>
            
        </div>
      </div>

    );
  };
  

};

export default ModalRedio;