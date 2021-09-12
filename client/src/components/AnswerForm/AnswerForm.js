import React from 'react';
import AvatarField from '../Atoms/AvatarField/AvatarField.js';
import StarButton from '../StarButton/StarButton.js';
import MessageIcon from '../MessageIcon/MessageIcon.js';
import CommentField from '../CommentField/CommentField.js';
import PaginationCmp from '../Pagination/PaginationCmp.js';
import CommentForm from '../CommentForm/CommentForm.js';
import useComment from '../../hook/useComment.js';
import DropButton from '../DropButton/DropButton.js';

import { ENDPOINT_DIC } from '../../constants/modalConstants';
import './AnswerForm.css';


function AnswerForm({ data, index, showDeleteModal, postId }) {

    const { CommentData, CommentState, MessageIconOnClick, PageState,
                            pageSelect, commentRegister  } 
                                                = useComment( { COMMENT_ENDPOINT:ENDPOINT_DIC['replyComments'], 
                                                                id:data.replyId });
    
    const answerInfo = { "type": "answerModify", "userId":null, 
                         "content": data.replyContent, "postId":postId,
                         "replyId":data.replyId, "buttonName":"수정" };
    
    const handleMenuClick = event => {
        if (event.key === 'delete'){
            showDeleteModal(ENDPOINT_DIC['replies'], data.replyId)
        }
    };

    return (
        <div className="answer_area" key={"answer_area" + index}>
            <ul className="answer_list" >
                <li className="answer">
                    <div className="answer_header">
                        <AvatarField userid={data.userName} grade={data.grade}></AvatarField>
                        {localStorage.getItem('username') === data.userName  ?
                            <div>

                                {/* 삭제, 수정 버튼 */}
                                <DropButton info={answerInfo}
                                            handleMenuClick={handleMenuClick}
                                            ENDPOINT_DIC={ENDPOINT_DIC}
                                            >
                                </DropButton>

                            </div>
                                : null}
                    </div>
                    <div className="answer_content">
                        { data.replyContent.split("\n").map((line, index) => {
                           return <span key={"replyContent" + index}>{line}<br /></span>
                        })}
                    </div>
                    <div className="answer_footer">
                    
                            <StarButton id={data.replyId}></StarButton> 
                        
                        <div onClick={() => MessageIconOnClick(ENDPOINT_DIC['replyComments'], index)}>
                            <MessageIcon commentCount={0}></MessageIcon>
                        </div>

                    </div>
                </li>
            

                {/*   댓글 작성   */}
                { CommentState ? [ 
                    <CommentForm key={ "CommentForm" + index } userId={data.replyId} 
                                        onFinish={commentRegister}></CommentForm>,

                    <CommentField key={ "AnswerCommentField" + index } 
                            commentData={ CommentData }
                            showDeleteModal={showDeleteModal}
                            COMMENT_ENDPOINT={ENDPOINT_DIC['replyComments']}>
                    </CommentField>,

                    <PaginationCmp key={ "AnswerPage" + index } currentPage={PageState}
                            totalPages={CommentData.length}
                                    pageSelect={pageSelect}
                                    />]: null}
            
            </ul>


            
        </div>
    );
};

export default React.memo(AnswerForm);



