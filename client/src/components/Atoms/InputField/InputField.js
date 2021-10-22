import React from 'react';

import { Input } from 'antd';

function InputField({ placeHolder=null, defaultValue=null, onChange=null, infoRef=null }) {

    return (
            <Input placeholder={ placeHolder } 
                   onChange={onChange}
                   ref={infoRef}
                   defaultValue={defaultValue}
            />
    );
};

export default React.memo(InputField);
