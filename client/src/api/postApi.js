import axios from 'axios';
import { URL } from '../config/confing';

const postApi = {

    fetchAnswer: async(postId, currentPage) => {

        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        try {
            const response = await axios.get(`${URL}/replies/${postId}?page=${currentPage}`, headers);
            const { replies } = response.data;

            return replies;
        } catch (error) {
            console.log("fetchAnswer", error);
        }
        
    },

    fetchQuestion: async(postId) => {


        try {
            const { data } = await axios.get(`${URL}/posts/${postId}`);

            return data;
    
        } catch (error) {
            console.log("fetchPost", error);
        }
        
    },


    fetchComment: async(endpoint, id, page=0) => {

        try {
            axios.defaults.headers.common['Authorization'] 
                = `Bearer ${localStorage.getItem('token')}`

            const response = await axios.get(`${URL}/${endpoint}/${id}?page=${page}`);

            const { data } = response;

            return data;

        } catch (error) {
            console.log("fetchComment", error);
        }
    },


    fetchCommentRegister: async(endpoint, body) => {

        console.log("aaaaaa", endpoint, body)

        try {
            const { status } = await axios.post(`${URL}${endpoint}`, body);
            if (status === 200){    
                // window.location.reload();
            } else {
                alert('댓글 작성 실패')
                return;
            }
            
        } catch (error) {
            console.log("fetchAnswer", error);
        }
        
    },

    fetchDelete: async(url) => {

        console.log("url",url);
        
        try {
            // const response = await axios.delete(`/${url}`);
            const response = true;

            return response;
    
        } catch (error) {
            console.log("fetchDelete", error);
        }
        
    },

};

export default postApi;