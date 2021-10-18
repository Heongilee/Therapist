import React from 'react';
import { Link } from 'react-router-dom';
import './BoardForm.css';


function BoardForm({ postData, cateGory, currentPage, CATEGORY_HANGUL_LIST }) {
    const postList = 
    postData.slice((currentPage - 1) * 6, ((currentPage - 1) * 6) + 6)
    .map((data, index) => {

        return <li className="post_area" key={ "data" + index }>
                        <div className="post">
                        <Link to={{pathname :`/posts/${data.postId}`,
                              postId : data.postId }}>
                            <div className="post_header">
                                    <h1>{data.postTitle}</h1>   
                                    {/* <div>{data.postContent}</div> */}
                                    <div>
                                    { data.postContent.split('<br>').map((line, index) => {
                                        return <span key={"postContent" + index}>{line}<br /></span>
                                    })}
                                    </div>
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
                        <div className="category_name">{CATEGORY_HANGUL_LIST[cateGory]}</div>
                    </div>
                    <ul className="posts_list">
                        { postList }
                    </ul>
                </div>
        );
};

export default BoardForm;

