import { Pagination } from 'antd';
import React from 'react';
import './PaginationCmp.css';

function PaginationCmp({ totalPages=0, pageSelect }) {



    return (
        <div className="board_pagination" >
            <Pagination defaultCurrent={1} total={6 * totalPages} onChange = {pageSelect}/>
        </div>
    )

};

export default PaginationCmp;