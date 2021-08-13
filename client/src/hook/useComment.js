import { useState, useEffect } from 'react';
import postApi from '../api/postApi.js';

function useComment({ postData }) {
    
    const [CommentState, setCommentState] = useState();
    const [Comment, setComment] = useState(); 

    useEffect(() => {
        if (postData) {
            setCommentState( postData.reduce((temp, _ ,index) => ({
                ...temp,[index]:false }),{}));
        }
    }, [postData]);

    const MessageIconOnClick = async(parms, index) => {
                
        if (!CommentState[index]){
            const { postId, replyId } = postData[index];
            const id = postId ? postId : replyId;
            const response = await postApi.fetchComment(parms, id);
            setComment(response);
        }
        setCommentState({ ...CommentState, [index] : !CommentState[index]});
    };

    const commentRegister = async({ comment }) => {

        const response = await postApi.fetchCommentRegister(comment);
        if (response) {
            alert("성공!!!")
        }
    };

    return { commentData:Comment, CommentState, MessageIconOnClick, commentRegister } ;
};

export default useComment;


