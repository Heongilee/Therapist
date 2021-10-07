import axios from 'axios';
import { URL } from '../config/confing.js';



const boardApi = {

    fetchPosts: async(postType='JOB') => {

        try {
            const response = await axios.get(`${URL}/posts?postType=${postType}`);
            console.log("fetchPosts", response)
            const { data } = response;
            return data;
    
        } catch (error) {
            console.log("requestBoardList", error)
        }
        
    },
    
    fetchMypage: async(postType='category1', page='1') => {

        try {
            // const response = await axios.get(`/api/posts?postType=${postType}`);
            const response = await temp2(postType);
    
            return response;
    
        } catch (error) {
            console.log("requestBoardList", error);
        }
        
    },
};


export default boardApi;
