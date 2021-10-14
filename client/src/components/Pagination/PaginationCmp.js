import { Pagination } from 'antd';
import React from 'react';
import './PaginationCmp.css';

function PaginationCmp({ totalPages, pageSelect, currentPage=1 }) {

    return (
        <div className="pagination" >
            <Pagination current={parseInt(currentPage)} 
                                total={(totalPages / 6) * 10} 
            onChange = {(page) => pageSelect(page)}/>
        </div>
    )

};

export default React.memo(PaginationCmp);
