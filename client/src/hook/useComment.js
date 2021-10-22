import { useState } from 'react';
import postApi from '../api/postApi.js';
import { socket_actions } from '../_actions/socket_actions';

import { useDispatch } from 'react-redux';


// 작성한 글 id
function useComment({ COMMENT_ENDPOINT, id, userName }) {
    const dispatch = useDispatch();

    const [CommentState, setCommentState] = useState(false);
    const [CommentData, setComment] = useState([]);
    const [PageState, setPageState] = useState();


    const MessageIconOnClick = async(parms, index) => {
        if (!CommentState){
            const { postComments, replyComments } = await postApi.fetchComment(parms, id);

            setComment(postComments || replyComments);
        }
        setCommentState(!CommentState);
    };

    const commentRegister = async(userId, { comment }) => {

        const body = COMMENT_ENDPOINT === 'postComments' ? 
                    { postCommentContent : comment }
                :
                    { replyCommentContent : comment };

        const useName = localStorage.getItem('username');
        const endpoint = `/${COMMENT_ENDPOINT}/${useName}/${id}`;

        await postApi.fetchCommentRegister(endpoint, body);

        const message = {
            type:"message",
            senderUsername: useName,
            postType: COMMENT_ENDPOINT,
            receivedUserName: userName
        }

        dispatch(socket_actions.sendMessage(message));

    };

    const pageSelect = async(page) => {
        const response = await postApi.fetchComment(COMMENT_ENDPOINT, id, page - 1);

        setComment(response);
        setPageState(page);
    };
    

    return { CommentData, CommentState, PageState, pageSelect,
        MessageIconOnClick, commentRegister } ;
}

export default useComment;
