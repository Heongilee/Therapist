import React from 'react';
import useStar from '../../hook/useStar.js';
import { Rate } from 'antd';

function StarButton({ REPLY_ENDPOINT, id, isCheked, replyStar }) {

    const { StarValue, StarState, handleChange } = useStar({REPLY_ENDPOINT, id});

    return (
            <div >
                <Rate onChange={ handleChange }  
                    disabled={isCheked} 
                    value={replyStar} />
                
            </div>
        )
};

export default React.memo(StarButton);
