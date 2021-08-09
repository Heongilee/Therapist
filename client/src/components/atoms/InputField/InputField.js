import React from 'react';
import { Input } from 'antd';

function InputField({ placeHolder=null, InputChange=null }) {
    return (
            <Input placeholder={ placeHolder } onChange={InputChange}/>
    );
};

export default InputField;
