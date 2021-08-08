import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import ModernButton from '../../components/atoms/ModernButton/ModernButton.js';
import { withRouter } from "react-router-dom";
import useBoard from '../../hook/useBoard.js';
import BoardForm from '../../components/BoardForm/BoardForm.js';
import MyPageForm from '../../components/MyPageForm/MyPageForm.js';

import './MyPage.css';

const PATH = "mypage";
const CATEGORY_LIST = ["category1","category2"];
const CATEGORY_DIC = {"category1":["postTitle","postContent"],'category2':["postTitle","postContent"]};

function Mypage() {

    const { BoardState, categorySelect, pageSelect } = useBoard({ PATH });
    
    return (
            <section className="boardPage">
                <div className="wrapper">
                    <div className="boardPage_area">
                        <div className="sideBar_area">
                            {BoardState.currentType && 
                                <SideBar category={BoardState.currentType} categoryList={CATEGORY_LIST} 
                                categorySelect={categorySelect}></SideBar>}
                        </div> 
                        <div className='posts_area'>

                            {BoardState.posts && <MyPageForm path={PATH} postData={BoardState.posts}
                             cateGory={CATEGORY_DIC[BoardState.currentType]}> 
                             </MyPageForm>}
                                           
                            {BoardState.totalPage && <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
            </section>
    );

};

// export default React.memo(Mypage);

export default withRouter(Mypage);


// import React from 'react';
// import SideBar from '../../components/SideBar/SideBar.js';
// import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
// import ModernButton from '../../components/atoms/ModernButton/ModernButton.js';
// import { withRouter } from "react-router-dom";
// import useBoard from '../../hook/useBoard.js';
// import BoardForm from '../../components/BoardForm/BoardForm.js';

// import './MyPage.css';

// const PATH = "mypage";
// const CATEGORY_LIST = ["category1","category2"];
// const CATEGORY_DIC = {"category1":["postTitle","postContent"],'category2':["postTitle","postContent"]};

// function Mypage() {

//     const { BoardState, categorySelect, pageSelect, handleButtonClick, checkBoxhandler } = useBoard({ PATH });

//     console.log("mypage");
    
//     return (
//             <section className="boardPage">
//                 <div className="wrapper">
//                     <div className="boardPage_area">
//                         <div className="sideBar_area">
//                         {BoardState.currentType && 
//                             <SideBar category={BoardState.currentType} categoryList={CATEGORY_LIST} 
//                             categorySelect={categorySelect}></SideBar>}
//                         </div> 
//                         <div className='posts_area'>

//                             {BoardState.posts && <BoardForm path={PATH} postData={BoardState.posts}
//                              checkList={BoardState.check} checkBoxhandler={checkBoxhandler} 
//                              cateGory={CATEGORY_DIC[BoardState.currentType]} >
//                              </BoardForm>}

//                             <ModernButton ButtonName={"삭제"} handleButtonClick={handleButtonClick}></ModernButton>
                            
//                             {BoardState.totalPage && <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageSelect}></PaginationCmp>}    
//                         </div>
//                     </div>
//                 </div>
//             </section>
//     );

// };

// export default withRouter(Mypage);