import React from 'react';
import BoardForm from '../../components/BoardForm/BoardForm.js';
import useBoardState from '../../hook/useBoardState.js';
import { PATH, ENDPOINT, ININIAL_POSTTYPE } from '../../constants/noticeConstants.js';
import './NoticePage.css';

function NoticePage() {

    const { BoardState, pageSelect, TotalBoard } = useBoardState({ PATH, ENDPOINT, ININIAL_POSTTYPE });

    return (
        <section className='notice_section'>
            {TotalBoard && <BoardForm path={PATH} 
                            postData={TotalBoard.posts} 
                            currentPage={BoardState.currentPage}
                            cateGory={"알림"}></BoardForm>}
            {TotalBoard && 
                        <PaginationCmp currentPage={BoardState.currentPage} 
                                totalPages={TotalBoard.totalAmount} pageSelect={pageSelect}>
                        </PaginationCmp>}    
        </section>
    );
};

export default NoticePage;
