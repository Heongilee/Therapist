import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

// autoSize={{ minRows: 3, maxRows: 5 }}

//showCount maxLength={500}
function TextField() {
    return (
        <div>
            <TextArea/>
        </div>
    )
};

export default TextField;
