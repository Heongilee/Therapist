import React from 'react';
import { Button } from 'antd';

function ModernButton({ ButtonName, handleButtonClick=null, htmlType=null, type=null }) {
    return (
        <Button type={type} htmlType={htmlType} onClick={handleButtonClick}>{ButtonName} </Button>
    );
};

export default React.memo(ModernButton);