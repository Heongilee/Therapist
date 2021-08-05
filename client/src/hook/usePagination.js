import React from 'react';
import adsf from '../components/Pagination/PaginationCmp.js'

function usePagination({BoardState, history }) {
    
    const pageSelect = page => {
        history.push(`/${PATH}?category=${BoardState.currentType}&page=${page}`);                                        
        // setBoardState({...BoardState, currentPage:page});
    };

    return (
        <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageSelect}></PaginationCmp>    
    )
}

export default usePagination
