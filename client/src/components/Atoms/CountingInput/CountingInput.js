import React from 'react';
import { Input } from 'antd';


const { TextArea } = Input;

function CountingInput({ count=500 }) {


    return (
        <TextArea showCount maxLength={ count }/>
    );
};

export default CountingInput;
