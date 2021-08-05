import React from 'react';
import { Button } from 'antd';

function ModernButton({ ButtonName, handleButtonClick=null, htmlType=null}) {
    return (
        <Button htmlType={htmlType} onClick={handleButtonClick}>{ButtonName} </Button>
    );
};

export default ModernButton;