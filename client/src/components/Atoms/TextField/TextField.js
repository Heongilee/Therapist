import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;


function TextField({ placeholder='', TextFieldChange=null}) {
    return (
        <div>
            <TextArea placeholder={ placeholder} onChange={TextFieldChange}/>
        </div>
    )
};

export default TextField;
