import axios from 'axios';
import { URL } from '../config/confing.js'

const mypageApi = {
    
    fetchMypage: async(postType='category1', page='1',userName="user") => {

        try {
            const response = await axios.get(`${URL}/mypage/${userName}?menuType=${postType}&page=${page}`);
            console.log("responst", response)
    
        } catch (error) {
            console.log("requestBoardList", error);
        }
        
    },

    fetchMypageDelete: async(postType, data) => {

        console.log("response", postType, data);

        // post, reply, postComment, replyComment
        const url = URL + `/users/mypage?type=` + postType;

        // try {
        //     const response = await axios.post(url, data);
            
        //     console.log("response", response);

        //     return response;
    
        // } catch (error) {
        //     console.log("requestBoardList", error);
        // }
        
    },

};


export default mypageApi;
