import React, { useState } from 'react';
import { Checkbox } from 'antd';
import './BoardForm.css';


function BoardForm({ path, postData, cateGory, checkList=null, checkBoxhandler=null }) {

    
    console.log("대답");

    const postList = postData.map((data, index) => {
        
        return <li className="post_area" key={ "data" + index }>
                       { path === "mypage" ? <Checkbox dataSet={index}  checked={checkList[index]}
                                        onChange={(event)=>checkBoxhandler()}></Checkbox> : null}
                        <div className="post">
                            <div className="post_header">
                                <div>{data[cateGory[0]]}</div>   
                                <div>{data[cateGory[1]]}</div>
                            </div>
                                <div className="post_footer">
                                    { path === "board" ? <div>답변 { data.replyLength }</div> : null}
                                </div>
                        </div>
                </li>
        });
        
        return (
                <div className="posts">
                    <div className="posts_header">
                        <div className="category_name">카테고리 이름</div>
                    </div>
                    <ul className="posts_list">
                        { postList }
                    </ul>
                </div>
        );
};

export default BoardForm;



// import React, { useState } from 'react';
// import { Checkbox } from 'antd';
// import './BoardForm.css';


// function BoardForm({ path, postData, cateGory, checkList=null, checkBoxhandler=null }) {

    
//     console.log("대답");

//     const postList = postData.map((data, index) => {
        
//         return <li className="post_area" key={ "data" + index }>
//                        { path === "mypage" ? <Checkbox dataSet={index}  checked={checkList[index]}
//                                         onChange={(event)=>checkBoxhandler(event)}></Checkbox> : null}
//                         <div className="post">
//                             <div className="post_header">
//                                 <div>{data[cateGory[0]]}</div>   
//                                 <div>{data[cateGory[1]]}</div>
//                             </div>
//                                 <div className="post_footer">
//                                     { path === "board" ? <div>답변 { data.replyLength }</div> : null}
//                                 </div>
//                         </div>
//                 </li>
//         });
        
//         return (
//                 <div className="posts">
//                     <div className="posts_header">
//                         <div className="category_name">카테고리 이름</div>
//                     </div>
//                     <ul className="posts_list">
//                         { postList }
//                     </ul>
//                 </div>
//         );
// };

// export default BoardForm;