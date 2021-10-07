import axios from 'axios';
import { URL } from '../config/confing';


const postApi = {

    fetchAnswer: async(postId, currentPage,history) => {

        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        try {
            const { data, status } = await axios.get(`${URL}/replies/${postId}?page=${currentPage}`, headers);

            if (status === 200){

                return data;
                
            }

            
        } catch (error) {
            console.log("fetchAnswer", error);
            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
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




};

export default postApi;