import axios from 'axios';



const writeApi = {

    // 질문글 등록
    fetchRegisterPost: async({ userName, postType, postTitle, postContent }) => {
        const body = { userName: userName, postType: postType
            ,postTitle: postTitle, postContent: postContent }

        try {

            // const response = await axios.post('/posts', body );
            const response = true;
            
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
            // const response = await axios.put('/posts/${postId}', body );
            const response = true;
            
            return response;

        } catch (error) {
            console.log("fetchModifyPost", error);
        }
    }, 
    
    // 답글 등록
    fetchAnswerRegister: async({ postId, userName, content }) => {
        const body = { postId: postId, userName: userName, content: content }
        try {
            // const response = await axios.post(`/replies/${postId}`, body);
            const response = true;

            return response;

        } catch (error) {
            console.log("fetchAnswerRegister", error);
        }
    },    

    // 답글 수정
    fetchAnswerModify: async( { replyContent, replyId }) => {
        const body = { replyContent: replyContent, replyId: replyId }

        try {
            // const response = await axios.put(`/replies/${replyId}`, body);
            const response = true;

            return response;

        } catch (error) {
            console.log("fetchAnswerModify", error);
        }
    
    }


};

export default writeApi;