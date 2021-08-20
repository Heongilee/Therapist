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
};

export default useComment;



// import { useState, useEffect } from 'react';
// import postApi from '../api/postApi.js';


// /**
//  * @typedef {Object} useComment
//  * @property { Array.<{id:number, content:string, grade:string }> } commentData - 댓글정보
//  * @property { Array.<{index:boolean }> } CommentState - 댓글 열림 닫힘을 구분하는 상태정보
//  * @property { funtion } MessageIconOnClick - 메세지 아이콘 클릭 이벤트
//  * @property { function } commentRegister - 댓글 등록 요청 이벤트
//  */

// /**
// * @param {Array.<{postId:number, postTitle:string,postContent:string }>} postData - 댓글 data
// * @return {useComment} 
// */


// function useComment({ postData }) {
    
//     const [CommentState, setCommentState] = useState();
//     const [Comment, setComment] = useState(); 

//     useEffect(() => {
//         if (postData) {
//             setCommentState( postData.reduce((temp, _ ,index) => ({
//                 ...temp,[index]:false }),{}));
//         }
//     }, [postData]);

//     /**
//     * @param { string } parms - 게시글에 달린 댓글인지 답글에 달린 댓글인지 구분하기위한 문자열 
//     * @param { number } index - 메시지 아이콘을 클릭시 해당 글 위치에있는 index
//     */

//     const MessageIconOnClick = async(parms, index) => {
                
//         if (!CommentState[index]){
//             const { postId, replyId } = postData[index];
//             const id = postId ? postId : replyId;
//             const response = await postApi.fetchComment(parms, id);
//             setComment(response);
//         }
//         setCommentState({ ...CommentState, [index] : !CommentState[index]});
//     };

//     /**
//     * @param { string } comment - 댓글 내용 
//     */

//     const commentRegister = async({ comment }) => {

//         const response = await postApi.fetchCommentRegister(comment);
//         if (response) {
//             alert("성공!!!")
//         }
//     };

//     return { commentData:Comment, CommentState, MessageIconOnClick, commentRegister } ;
// };

// export default useComment;


