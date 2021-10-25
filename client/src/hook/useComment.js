import { useState } from 'react';
import postApi from '../api/postApi.js';
import api from '../api/api.js';

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

        if (comment === undefined){
            alert("3글자이상 적어주세요");
            return;
        }

        if (comment.length < 3){
            alert("3글자이상 적어주세요");
            return;
        }

        const body = COMMENT_ENDPOINT === 'postComments' ? 
                    { postCommentContent : comment }
                :
                    { replyCommentContent : comment };

        const useName = localStorage.getItem('username');
        const endpoint = `${COMMENT_ENDPOINT}/${useName}/${id}`;

        const response = await api.fetchRegister(endpoint, body);

        if (response){
            const message = {
                type:"message",
                senderUserName: useName,
                postType: COMMENT_ENDPOINT,
                receivedUserName: userName
            }
    
            dispatch(socket_actions.sendMessage(message));
            window.location.reload();
        };
    };

    const pageSelect = async(page) => {
        const { postComments, replyComments} = await postApi.fetchComment(COMMENT_ENDPOINT, id, page - 1);
        
        setComment(postComments || replyComments);
        setPageState(page);
    };
    

    return { CommentData, CommentState, PageState, pageSelect,
        MessageIconOnClick, commentRegister } ;
}

export default useComment;