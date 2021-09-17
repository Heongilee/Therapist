import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import WriteButton from '../../components/WriteButton/WriteButton.js';
import BoardForm from '../../components/BoardForm/BoardForm.js';
import SelectCard from '../../components/SelectCard/SelectCard.js';
import useBoardState from '../../hook/useBoardState.js';
import { PATH, CATEGORY_LIST, 
        ENDPOINT, ININIAL_POSTTYPE } from '../../constants/boardPageConstants.js';

import './BoardPage.css';


function BoardPage() {
    const { BoardState, categorySelect, 
        pageSelect, TotalBoard } = useBoardState({ PATH, ENDPOINT, ININIAL_POSTTYPE });

    

    return (
            <section className="boardPage">
                <div className="wrapper">

                    {TotalBoard && <SelectCard CATEGORY_LIST={CATEGORY_LIST}
                                categorySelect={categorySelect}> </SelectCard>}

                    <div className="boardPage_area">
                        
                        <div className="sideBar_area">
                        {TotalBoard && 
                            <SideBar category={BoardState.postType}
                                    CATEGORY_LIST={CATEGORY_LIST} 
                                    categorySelect={categorySelect}></SideBar>}
                        </div> 

                        <div className='posts_area'>
                            {TotalBoard && <BoardForm path={PATH} 
                                            postData={TotalBoard.posts} 
                                            currentPage={BoardState.currentPage}
                                            cateGory={BoardState.postType}></BoardForm>}
                            
                            {TotalBoard && <WriteButton></WriteButton>}
                            {TotalBoard && 
                            <PaginationCmp currentPage={BoardState.currentPage} 
                                totalPages={TotalBoard.totalAmount} pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default BoardPage;


