import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import WriteButton from '../../components/WriteButton/WriteButton.js';
import BoardForm from '../../components/BoardForm/BoardForm.js';
import SelectCard from '../../components/SelectCard/SelectCard.js';
import useBoardState from '../../hook/useBoardState.js';
import { PATH, CATEGORY_LIST } from '../../constants/boardPageConstants.js';


import './BoardPage.css';


function BoardPage() {

    const { BoardState, categorySelect, pageSelect, TotalBoard } = useBoardState({ PATH });


    return (
            <section className="boardPage">
                <div className="wrapper">

                    {TotalBoard.posts && <SelectCard CATEGORY_LIST={CATEGORY_LIST}
                                categorySelect={categorySelect}> </SelectCard>}

                    <div className="boardPage_area">
                        
                        <div className="sideBar_area">
                        {TotalBoard.posts && 
                            <SideBar category={BoardState.postType}
                                    CATEGORY_LIST={CATEGORY_LIST} 
                                    categorySelect={categorySelect}></SideBar>}
                        </div> 

                        <div className='posts_area'>
                            {TotalBoard.posts && <BoardForm path={PATH} 
                                            postData={TotalBoard.posts} 
                                            currentPage={BoardState.currentPage}
                                            cateGory={BoardState.postType}></BoardForm>}
                            <WriteButton></WriteButton>
                            {TotalBoard.posts && 
                            <PaginationCmp currentPage={BoardState.currentPage} 
                                totalPages={TotalBoard.totalPages} pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default BoardPage;


