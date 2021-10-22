import React from 'react';
import useInfiniteScroll from '../../hook/useInfiniteScroll';
import SpinLoadIcon from '../SpinLoadIcon/SpinLoadIcon.js';

function InfiniteArea({totalpage, currentPage, loadData, loading}) {

    const setTarget = useInfiniteScroll({ currentPage, loadData, totalpage });

    return (
        <>
            <div ref={setTarget}> {loading && <SpinLoadIcon/>}</div>
        </>
    )
}

export default InfiniteArea;
