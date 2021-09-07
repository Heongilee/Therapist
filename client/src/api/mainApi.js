import axios from 'axios';
import { URL } from '../config/confing';

// const API = "http://ec2-184-73-134-45.compute-1.amazonaws.com:8080/api/main/posts"

const mainApi = {

    fetchRecentBoard: async() => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            const response = await axios.get(`${URL}/main/posts`);
    
            const { data } = response;
            return data;
    
        } catch (error) {
            console.log("fetchRecentBoard", error)
        }
        
    },


    fetchVoiceRoom: async() => {

        try {

            
            const response = [1,2,3,4,5,6,7,8]

            return response;
    
        } catch (error) {
            console.log("fetchVoiceRoom", error)
        }
    },

    fetchCreateRoom: async() => {

        try {

            
            const response = true;

            return response;
    
        } catch (error) {
            console.log("fetchCreateRoom", error)
        }
    }

}

export default mainApi;
    


