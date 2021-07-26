import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;


function TextField({ placeholder=''}) {
    return (
        <div>
            <TextArea placeholder={ placeholder }/>
        </div>
    )
};

export default TextField;
