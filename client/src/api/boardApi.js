import axios from 'axios';
import { URL } from '../config/config.js';



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
    
};


export default boardApi;
