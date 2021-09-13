import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import useBoardState from '../../hook/useBoardState.js';
import MyPageForm from '../../components/MyPageForm/MyPageForm.js';
import SelectCard from '../../components/SelectCard/SelectCard.js';
import { PATH, CATEGORY_LIST, CATEGORY_DIC, 
                    ENDPOINT,ININIAL_POSTTYPE, POST_DATA  } from '../../constants/myPageConstants.js';

import './MyPage.css';

function Mypage() {

    const { BoardState, categorySelect, 
        pageSelect, TotalBoard } = useBoardState({ PATH, ENDPOINT, 
                                                ININIAL_POSTTYPE, userName:localStorage.getItem('username') });
    return (
            <section className="myPage">
                <div className="wrapper">

                {TotalBoard && <SelectCard CATEGORY_LIST={CATEGORY_LIST}
                                categorySelect={categorySelect}> </SelectCard>}

                                
                    <div className="myPage_area">
                        <div className="myPage_sideBar_area">
                            {TotalBoard && 
                                <SideBar category={BoardState.postType} 
                                CATEGORY_LIST={CATEGORY_LIST} 
                                categorySelect={categorySelect}></SideBar>}
                        </div> 
                        <div className='myPage_posts_area'>

                            {TotalBoard && <MyPageForm path={PATH} 
                            postData={ TotalBoard.postData }
                            cateGory={CATEGORY_DIC[BoardState.postType]}
                            postType={BoardState.postType}
                            currentPage={BoardState.currentPage} 
                            
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

