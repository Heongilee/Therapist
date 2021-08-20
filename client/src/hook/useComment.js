import { useState, useCallback } from 'react';
import postApi from '../api/postApi.js';


// 작성한 글 id
function useComment({ COMMENT_ENDPOINT, id }) {
    
    const [CommentState, setCommentState] = useState(false);
    const [CommentData, setComment] = useState();
    const [PageState, setPageState] = useState();


    const MessageIconOnClick = async(parms, index) => {
        if (!CommentState){
            const response = await postApi.fetchComment(parms, id);
            setComment(response);
        }
        setCommentState(!CommentState);
    };

    const commentRegister = async(userId, { comment }) => {
        console.log("이벤트", userId, comment)
        // const response = await postApi.fetchCommentRegister(comment);
    };

    const pageSelect = async(page) => {
        const response = await postApi.fetchComment(COMMENT_ENDPOINT, id, page);

        setComment(response);
        setPageState(page);
    };
    

    return { CommentData, CommentState, PageState, pageSelect,
        MessageIconOnClick, commentRegister } ;
}

export default useComment;
