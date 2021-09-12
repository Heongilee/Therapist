import React from 'react';
import useStar from '../../hook/useStar.js';
import { Rate } from 'antd';

function StarButton({ REPLY_ENDPOINT, id }) {

    const { StarValue, StarState, handleChange } = useStar({REPLY_ENDPOINT, id});


    return (
            <>
                <Rate onChange={ handleChange }  
                        disabled={StarState} value={StarValue} />
                
            </>
        )
};

export default React.memo(StarButton);
