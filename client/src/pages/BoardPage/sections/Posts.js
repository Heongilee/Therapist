


import React from 'react';
import { useDispatch, useSelector,shallowEqual, useCallback } from 'react-redux';
import  './Posts.css';
import { Checkbox } from 'antd';


function Posts({ postData }) {
    
    console.log("대답", postData);

    // 카테고리이름, 제목, 내용, 답변하기 
    const postList = postData.map((data, index) => {
                   
    return <li className="post_area" key={ "data" + index }>
                    {/* <Checkbox ></Checkbox> */}
                    <div className="post">
                        <div className="post_header">
                            <div>{data.postTitle}</div>   
                            <div>{data.postContent}</div>
                            </div>
                            <div className="post_footer">
                            <div>답변 { data.replyLength }</div> 
                        </div>
                    </div>
            </li>
    });

    return (
        <div className="boardPage_area">
                    <div className="sideBar_area">
                        <SideBar list={CATEGORY} categorySelect={categorySelect}></SideBar>
                    </div>
                
                    <div className='posts_area'>
                        <div className="posts">
                            <div className="posts_header">
                                <div className="category_name">카테고리 이름</div>
                                <SearchInput></SearchInput>
                            </div>
                                <ul className="posts_list">
                                        { postList }
                                </ul>
                        </div>
                        <WriteButton></WriteButton>
                        {BoardState.totalPage && <PaginationCmp currentPage={BoardState.currentPage} totalPage={BoardState.totalPage} pageSelect={pageChange}></PaginationCmp>}    
                    </div>
                </div>

    );
};

export default Posts;


// import React from 'react';
// import { useDispatch, useSelector,shallowEqual, useCallback } from 'react-redux';
// import  './Posts.css';
// import { Checkbox } from 'antd';


// function Posts({ postData }) {
    
//     console.log("대답", postData)
//     // 카테고리이름, 제목, 내용, 답변하기 
//     const postList = postData.map((data, index) => {
                   
//     return <li className="post_area" key={ "data" + index }>
//                     {/* <Checkbox ></Checkbox> */}
//                     <div className="post">
//                         <div className="post_header">
//                             <div>{data.postTitle}</div>   
//                             <div>{data.postContent}</div>
//                             </div>
//                             <div className="post_footer">
//                             <div>답변 { data.replyLength }</div> 
//                         </div>
//                     </div>
//             </li>
//     });

//     return (
//             <ul className="posts_list">
//                 { postList }
//             </ul>
//     );
// };

// export default Posts;