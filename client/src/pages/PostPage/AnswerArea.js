import React from 'react';
import useInfiniteScroll from '../../hook/useInfiniteScroll';


function AnswerArea({totalpage, currentPage, loadAnswerData, loading}) {

    const setTarget = useInfiniteScroll({ currentPage, loadAnswerData, totalpage });


    return (
        <>
            <div ref={setTarget}> {loading && "loading..."}</div>
        </>
    )
}

export default AnswerArea
