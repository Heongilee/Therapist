import React from 'react';
import AvatarField from '../Atoms/AvatarField/AvatarField.js';
import StarButton from '../StarButton/StarButton.js';
import MessageIcon from '../MessageIcon/MessageIcon.js';
import CommentField from '../CommentField/CommentField.js';
import PaginationCmp from '../Pagination/PaginationCmp.js';
import CommentForm from '../CommentForm/CommentForm.js';
import WriteLinkButton from '../WriteLinkButton/WriteLinkButton.js'
import useComment from '../../hook/useComment.js';
import { Button } from 'antd';
import  { ENDPOINT_DIC } from '../../constants/modalConstants';
import './AnswerForm.css';


function AnswerForm({ data, index, showDeleteModal, questionName, postId }) {


    const { CommentData, CommentState, MessageIconOnClick, PageState,
                            pageSelect, commentRegister  } 
                                                = useComment( { COMMENT_ENDPOINT:ENDPOINT_DIC['replyComments'], 
                                                                id:data.replyId });
    

    const answerInfo = { "type": "answerModify", "userId":questionName, 
                         "content": data.replyContent, "postId":postId,
                         "replyId":data.replyId, "buttonName":"수정" };

    return (
        <div className="answer_area" key={"answer_area" + index}>
            <ul className="answer_list" >
                <li className="answer">
                    <div className="answer_header">
                        <AvatarField userid={data.userId} grade={data.grade}></AvatarField>
                        <div>
                            <WriteLinkButton data={answerInfo}></WriteLinkButton>
                            <Button data-name={ data.replyId } 
                                onClick={(event) => showDeleteModal(ENDPOINT_DIC['replies'],{event}) }>삭제</Button>
                        </div>
                    </div>
                    <div className="answer_content">
                        <p> { data.replyContent }</p>
                    </div>
                    <div className="answer_footer">
                        <StarButton id={data.replyId}></StarButton>
                        <div onClick={() => MessageIconOnClick(ENDPOINT_DIC['replyComments'], index)}>
                            <MessageIcon></MessageIcon>
                        </div>
                    </div>
                </li>
            </ul>

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
                                    totalPage={12}
                                    pageSelect={pageSelect}
                                    />]: null}
        </div>
    );
};

export default React.memo(AnswerForm);



