import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import WriteButton from '../../components/WriteButton/WriteButton.js';
import BoardForm from '../../components/BoardForm/BoardForm.js';
import { PATH,CATEGORY_LIST, CATEGORY_DIC } from '../../constants/boardPageConstants.js';
import useBoard from '../../hook/useBoard.js';

import './BoardPage.css';


function BoardPage() {

    const { BoardState, categorySelect, pageSelect } = useBoard({ PATH });

    console.log("BoardPage");

    return (
            <section className="boardPage">
                <div className="wrapper">
                    <div className="boardPage_area">
                        <div className="sideBar_area">
                        {BoardState.currentType && 
                            <SideBar category={BoardState.currentType}
                                    categoryList={CATEGORY_LIST} categorySelect={categorySelect}></SideBar>}
                        </div> 
                        <div className='posts_area'>
                        {BoardState.posts && <BoardForm path={PATH} postData={BoardState.posts}
                                                                    cateGory={CATEGORY_DIC[BoardState.currentType]}></BoardForm>}
                        <WriteButton></WriteButton>
                        {BoardState.totalPage && 
                        <PaginationCmp currentPage={BoardState.currentPage} 
                            totalPage={BoardState.totalPage} pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default BoardPage;
