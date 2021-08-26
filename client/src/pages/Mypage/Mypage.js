import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import useBoard from '../../hook/useBoard.js';
import MyPageForm from '../../components/MyPageForm/MyPageForm.js';
import { PATH, CATEGORY_LIST, CATEGORY_DIC  } from '../../constants/myPageConstants.js';

import './MyPage.css';

function Mypage() {

    const { BoardState, categorySelect, pageSelect } = useBoard({ PATH });
    

    return (
            <section className="boardPage">
                <div className="wrapper">
                    <div className="boardPage_area">
                        <div className="sideBar_area">
                            {BoardState.currentType && 
                                <SideBar category={BoardState.currentType} 
                                categoryList={CATEGORY_LIST} 
                                categorySelect={categorySelect}></SideBar>}
                        </div> 
                        <div className='posts_area'>

                            {BoardState.posts && <MyPageForm path={PATH} 
                            postData={BoardState.posts}
                             cateGory={CATEGORY_DIC[BoardState.currentType]}> 
                             </MyPageForm>}

                            {BoardState.totalPage && <PaginationCmp 
                            currentPage={BoardState.currentPage} 
                            totalPage={BoardState.totalPage} 
                            pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
            </section>
    );

};


export default Mypage;

