import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import useBoardState from '../../hook/useBoardState.js';
import useBoard from '../../hook/useBoard.js';
import MyPageForm from '../../components/MyPageForm/MyPageForm.js';
import { PATH, CATEGORY_LIST, CATEGORY_DIC, 
                    ENDPOINT,ININIAL_POSTTYPE  } from '../../constants/myPageConstants.js';

import './MyPage.css';

function Mypage() {

    // const { BoardState, categorySelect, pageSelect } = useBoard({ PATH });
    const { BoardState, categorySelect, 
        pageSelect, TotalBoard } = useBoardState({ PATH, ENDPOINT, 
                                                ININIAL_POSTTYPE, userName:localStorage.getItem('username') });

    return (
            <section className="myPage">
                <div className="wrapper">
                    <div className="myPage_area">
                        <div className="myPage_sideBar_area">
                            {TotalBoard && 
                                <SideBar category={BoardState.currentType} 
                                CATEGORY_LIST={CATEGORY_LIST} 
                                categorySelect={categorySelect}></SideBar>}
                        </div> 
                        <div className='myPage_posts_area'>

                            {TotalBoard && <MyPageForm path={PATH} 
                            postData={TotalBoard.posts}
                             cateGory={CATEGORY_DIC[BoardState.currentType]}
                             postType={BoardState.currentType}
                             > 
                             </MyPageForm>}

                            {TotalBoard && <PaginationCmp 
                            currentPage={BoardState.currentPage} 
                            totalPages={TotalBoard.totalAmount} 
                            pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
            </section>
    );

};


export default Mypage;

