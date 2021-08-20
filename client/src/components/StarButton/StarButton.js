import React from 'react';
import useStar from '../../hook/useStar.js';
import { Rate } from 'antd';

function StarButton({ REPLY_ENDPOINT, id }) {

    const { DESC, StarValue, StarState, handleChange } = useStar({REPLY_ENDPOINT, id});

    return (
            <>
                <Rate tooltips={ DESC } onChange={ handleChange }  
                        disabled={StarState} value={StarValue} />
                {StarValue ? <span className="ant-rate-text">
                        {DESC[StarValue - 1]}</span> : '' }
            </>
        )
};

export default React.memo(StarButton);
