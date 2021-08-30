import { Pagination } from 'antd';
import React from 'react';
import './PaginationCmp.css';

function PaginationCmp({ totalPages=0, pageSelect, currentPage=1 }) {

    
    return (
        <div className="pagination" >
            <Pagination current={parseInt(currentPage)} total={totalPages} 
            
            onChange = {(page) => pageSelect(page)}/>
        </div>
    )

};

export default React.memo(PaginationCmp);
