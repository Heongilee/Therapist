import axios from 'axios';
import { URL } from '../config/confing.js'


const writeApi = {

    // 질문글 등록
    fetchRegisterPost: async({ userName, postType, postTitle, postContent }) => {
        const body = { userName: userName, postType: postType
            ,postTitle: postTitle, postContent: postContent }
        
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.post(`${URL}/posts`, body );
            
            return response;

        } catch (error) {
            console.log("fetchRegisterPost", error);
        }
    },

    // 질문글 수정
    fetchModifyPost: async({ postId, postType, postTitle, postContent }) => {
        const body = { postId: postId, postType: postType
            ,postTitle: postTitle, postContent: postContent }

        try { 
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.put(`${URL}/posts/${postId}`, body );
            // const response = true;
            
            return response;

        } catch (error) {
            console.log("fetchModifyPost", error);
        }
    }, 
    
    // 답글 등록
    fetchAnswerRegister: async({ postId, userId, content }) => {

        const body = { postId: postId, userName: localStorage.getItem('username'),
                        userId:userId, replyContent: content };

        try {

            const response = await axios.post(`${URL}/replies/${postId}`, body);

            if (response.status === 200){
                return true;
            }
            

        } catch (error) {
            console.log("fetchAnswerRegister", error);
        }
    },    

    // 답글 수정
    fetchAnswerModify: async( { replyContent, replyId }) => {
        const body = { replyContent: replyContent, replyId: replyId }

        axios.defaults.headers.common['Authorization'] 
           = `Bearer ${localStorage.getItem('token')}`;

           try {
            const response = await axios.put(`${URL}/replies/${replyId}`, body);


            return response;

        } catch (error) {
            console.log("fetchAnswerModify", error);
        }
    
    },


    // 질문글 삭제
    fetchQuestionDelete: async(endpoint) => {
        
        try {
            const response = await axios.delete(`${URL + endpoint}`);
            return response;

        } catch (error) {
            console.log("fetchQuestionDelete", error);
        }
    
    },

     // 답글 삭제
     fetchAnswerDelete: async(endpoint) => {

        try {
            const response = await axios.delete(`${URL + endpoint}`);
            return response;

        } catch (error) {
            console.log("fetchAnswerDelete", error);
        }
    
    },
    
    // 질문글에 달린 댓글 삭제
    fetchPostCommentDelete: async(endpoint) => {

        try {
            const response = await axios.delete(`${URL + endpoint}`);
            return response;

        } catch (error) {
            console.log("fetchPostCommentDelete", error);
        }
    
    },

};

export default writeApi;