import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import SearchInput from '../../components/atoms/SearchInput/SearchInput.js'
import WriteButton from '../../components/WriteButton/WriteButton.js';
import BoardForm from '../../components/BoardForm/BoardForm.js'
import useBoard from '../../hook/useBoard.js';
import useCheckBox from '../../hook/useCheckBox.js';
import { withRouter } from "react-router-dom";

import './BoardPage.css';

const PATH = "board";
const CATEGORY_LIST = ["category1","category2","category3","category4"];
const CATEGORY_DIC = {"category1":["postTitle","postContent"],'category2':["postTitle","postContent"]};

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

export default withRouter(BoardPage);
