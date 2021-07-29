import React from 'react';
import  './css/Posts.css';

function Posts({ postData }) {
    
    console.log("대답", postData);

    // 카테고리이름, 제목, 내용, 답변하기 
    const postList = postData.map((data, index) => {
        
        return <li className="post" key={ index }>
                    <div className="post_header">
                        <div>{data.postTitle}</div>   
                        <div>{data.postContent}</div>
                    </div>
                    <div className="post_footer">
                        <span>답변 { data.replyLength }</span> 
                    </div>
               </li>
    });

    return (
            <ul className="posts_list">
                { postList }
            </ul>
    );
};

export default Posts;






