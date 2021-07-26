import React from 'react';
import './CommentField.css';

function CommentField({ commentData }) {

    return (
        <div className="comment_area" >
            <ul className="comment_list">
                { commentData.map(( data, index )  => {

                    return <li className="comment" key={ index }>
                    
                            <div className="comment_header">
                                { data.id }
                            </div>
                    
                            <div className="comment_content">
                                <div> { data.content } </div>   
                            </div>
                        </li> 
                })}
            </ul>
        </div>
    );
};

export default CommentField;
