import React from 'react';
import { Input } from 'antd';

function InputField({ placeHolder }) {
    return (
        <div>
            <Input placeholder={ placeHolder }/>
        </div>
    );
};

export default InputField;
