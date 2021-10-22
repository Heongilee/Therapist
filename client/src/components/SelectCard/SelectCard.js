import React, { useMemo } from 'react';

import './SelectCard.css';

function SelectCard({CATEGORY_LIST, categorySelect }) {


    const card = () => useMemo(() => 
    CATEGORY_LIST.map(( data )=> {
        return <div className="selectcard_area" key={data} 
                    onClick={()=>{categorySelect(data)}}>
                    <div className="selectcard">{data}</div>
                </div>
    })

    , [CATEGORY_LIST])
            
   

    return (
        <div className="selectcard_section">

                { card() }
        </div>
    );
};

export default SelectCard;



