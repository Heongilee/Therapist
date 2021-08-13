import React, { useState }from 'react';
import { Rate } from 'antd';

function StarButton() {

    const desc = ['쓰레기', '벌레', '짐승', '사람', '신'];
    const [value, stateValue] = useState('')


    const handleChange = value => {
        stateValue(value);
    };

    return (
        <div>
            <Rate tooltips={desc} onChange={ handleChange } value={value} />
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
        </div>
    )
};

export default StarButton;
