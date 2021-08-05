import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import SearchInput from '../../components/atoms/SearchInput/SearchInput.js'
import WriteButton from '../../components/WriteButton/WriteButton.js';
import { withRouter } from "react-router-dom";
import Posts from './sections/Posts';
import useBoard from '../../hook/useBoard.js';

import './BoardPage.css';

const PATH = "board"
const CATEGORY = ["category1","category2","category3","category4"];

function BoardPage() {

    const { BoardState,renderPosts, categorySelect, pageSelect } = useBoard({ PATH });

    console.log("BoardPage");

    return (
            <section className="boardPage">
                <div className="wrapper">
                    <div className="boardPage_area">
                        <div className="sideBar_area">
                            <SideBar list={CATEGORY} categorySelect={categorySelect}></SideBar>
                        </div> 
                        <div className='posts_area'>
                        {renderPosts()}
                        <WriteButton></WriteButton>
                        {BoardState.totalPage && <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageSelect}></PaginationCmp>}    
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default withRouter(BoardPage);


// import React from 'react';
// import SideBar from '../../components/SideBar/SideBar.js';
// import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
// import SearchInput from '../../components/atoms/SearchInput/SearchInput.js'
// import WriteButton from '../../components/WriteButton/WriteButton.js';
// import { withRouter } from "react-router-dom";
// import Posts from './sections/Posts';
// import useBoard from '../../hook/useBoard.js';

// import './BoardPage.css';


// const CATEGORY = ["category1","category2","category3","category4"];

//     const { BoardState, pageChange, categorySelect } = useBoard();


//     return (
//         <section className="boardPage">
//             <div className="wrapper">
//                 <div className="boardPage_area">
//                     <div className="sideBar_area">
//                         <SideBar list={CATEGORY} categorySelect={categorySelect}></SideBar>
//                     </div>
                
//                     <div className='posts_area'>
//                         <div className="posts">
//                             <div className="posts_header">
//                                 <div className="category_name">카테고리 이름</div>
//                                 <SearchInput></SearchInput>
//                             </div>
//                             {BoardState.post && <Posts postData={BoardState.post}></Posts>}
//                         </div>
//                         <WriteButton></WriteButton>
//                         {BoardState.totalPage && <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageChange}></PaginationCmp>}    
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default withRouter(BoardPage);
