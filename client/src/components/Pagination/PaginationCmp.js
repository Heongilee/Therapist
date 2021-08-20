import { Pagination } from 'antd';
import React from 'react';
import './PaginationCmp.css';

function PaginationCmp({ totalPage=0, pageSelect, currentPage=1 }) {


    return (
        <div className="pagination" >
            <Pagination current={parseInt(currentPage)} total={totalPage + 4} 
            
            onChange = {(page) => pageSelect(page)}/>
        </div>
    )

};

export default React.memo(PaginationCmp);
