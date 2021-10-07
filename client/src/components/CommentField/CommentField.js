import React from 'react';
import { Typography } from 'antd';
// import { useContextModal } from '../../hook/useContextModal.js'
import { COMMENT_KINDS } from '../../constants/postPageConstants';
import './CommentField.css';

const { Text } = Typography;


function CommentField({ commentData, COMMENT_ENDPOINT, showDeleteModal }) {

    const commentId = COMMENT_KINDS[COMMENT_ENDPOINT]['commentId'];
    const content = COMMENT_KINDS[COMMENT_ENDPOINT]['content'];
    // const { showDeleteModal } = useContextModal();
    return (
        <div className="comment_area" >
            <ul className="comment_list">
                { commentData.map(( data, index )  => {

                    return <li className="comment" key={ "comment" + index }>
                                <div className="comment_header">
                                    { data.userName }
                                </div>
                        
                                <div className="comment_content">
                                    {/* <div>{data[content]}</div> */}
                                    <div> { data[content].split("\n").map((line, index) => {
                                            return <span key={"content" + index}>{line}<br /></span>
                                         })}
                                    </div>

                                    {localStorage.getItem('username') === data.userName &&
                                        <Text data-name={ data[commentId] }  
                                            onClick={() => showDeleteModal(COMMENT_ENDPOINT,data[commentId]  ) } 
                                            type={ "secondary" }>삭제</Text>}
                                </div>
                            </li> 
                })}
            </ul>
        </div>
    );
};

export default React.memo(CommentField);

