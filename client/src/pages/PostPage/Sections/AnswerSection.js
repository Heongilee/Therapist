import React from 'react';
import AvatarField from '../../../components/atoms/AvatarField/AvatarField.js';
import StarButton from '../../../components/StarButton/StarButton.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import CommentField from '../../../components/CommentField/CommentField.js';
import PaginationCmp from '../../../components/Pagination/PaginationCmp.js';
import CommentForm from '../../../components/CommentForm/CommentForm.js';
import usePostData from '../../../hook/usePostData.js';
import useComment from '../../../hook/useComment.js';

import './AnswerSection.css';

const PATH = 'ANSWER';
const API_ENDPOINT = 'replyComments';

function AnswerSection() {

    const postData = usePostData({ PATH });
    const { commentData, CommentState, MessageIconOnClick, commentRegister  } = useComment( { postData });
    
    const answerList = postData && postData.map( (data, index) => {

        return  <div className="answer_area" key={index}>
                    <ul className="answer_list">
                        <li className="answer">
                            <div className="answer_header">
                                <AvatarField userid={data.id} grade={data.grade}></AvatarField>
                            </div>
                            <div className="answer_content">
                                <p> { data.replyContent }</p>
                            </div>
                            <div className="answer_footer">
                                <StarButton></StarButton>
                                <div onClick={() => MessageIconOnClick(API_ENDPOINT, index)}>
                                    <MessageIcon></MessageIcon>
                                </div>
                            </div>
                        </li>
                    </ul>

                        {/*   댓글 작성   */}

                        {CommentState &&
                         CommentState[index] === true ? [ 
                            <CommentForm key={ data.id + index } onFinish={commentRegister}></CommentForm>,
                            <CommentField key={ data.id } commentData={ commentData }></CommentField>,
                            <PaginationCmp key={ index } />]: ''}
                    
                </div>
    });
    

    return (
        <div className="wrapper">
            { answerList }
        </div>     
    );
};

export default AnswerSection;

