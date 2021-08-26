import React from 'react';
import { Link } from 'react-router-dom';
import './BoardForm.css';


function BoardForm({ postData, cateGory }) {

    console.log("대답");

    const postList = postData.map((data, index) => {

        return <li className="post_area" key={ "data" + index }>
                        <div className="post">
                        <Link to={{pathname :`/posts/${data.postId}`,
                              postId : data.postId }}>
                            <div className="post_header">
                                    <h1>{data[cateGory[0]]}</h1>   
                                    <div>{data[cateGory[1]]}</div>
                            </div>
                        </Link>
                            <div className="post_footer">
                                <div>답변 { data.replyLength }</div>
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

