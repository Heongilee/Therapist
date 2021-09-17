import React from 'react';
import useInfiniteScroll from '../../hook/useInfiniteScroll';


function InfiniteArea({totalpage, currentPage, loadData, loading}) {

    const setTarget = useInfiniteScroll({ currentPage, loadData, totalpage });

    
    return (
        <>
            <div ref={setTarget}> {loading && "loading..."}</div>
        </>
    )
}

export default InfiniteArea;
