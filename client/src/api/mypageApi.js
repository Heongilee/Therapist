import axios from 'axios';
import { URL } from '../config/config.js'



const mypageApi = {
    
    fetchMypage: async(postType='category1', page='1',userName="user") => {

        try {
            await axios.get(`${URL}/mypage/${userName}?menuType=${postType}&page=${page}`);
    
        } catch (error) {
            console.log("requestBoardList", error);
        }
        
    },
};


export default mypageApi;
