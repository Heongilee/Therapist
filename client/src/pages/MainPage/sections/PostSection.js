import React from 'react';
import './PostSection.css';

/**
* @param {Array.<{postId:number, postType:string, postTitle:string, 
    postContent:string, replyLength:number }>} postData 
*/

const PostSection = ({ postData }) => {

    const posts = postData.map((data, index) => {
        
        return <li className="resent_post_area" key={ "data" + index }>
                            <div className="resent_post_header">
                                <div>{data.postTitle} {'('}{data.postType}{')'} </div>   
                                <div>{data.postContent}</div>
                            </div>
                                <div className="resent_post_footer">
                                    <div>답변 { data.replyLength }</div>
                                </div>
                </li>
        });

    return (
        <ul className="resent_board_list">
            { posts }
        </ul>
        )        
};

export default PostSection;