import { URL } from '../config/config.js';
import axios from 'axios';



const api = {

    fetchChangeModerator: async(endPoint, userData) => {
        try {
            
            const { data, status } 
                    = await axios.put(`${URL}${endPoint}`,userData,{
                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});

            console.log("fetchChangeModerator",data)
            if (status === 200){

                const { status } = data;
                if (status === 'SUCCESS'){
                    return true;
                } else {
                    return false;
                }
            }

        } catch (error) {

            console.log("fetchRoomCount", error);
          
        }
    },

    fetchDeleteSession: async(endPoint) => {
        try {
            const { data, status } 
                    = await axios.delete(`${URL}${endPoint}`,{
                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});
            
            console.log("fetchDeleteSession", data);

            if (status === 200) {
                return true;
            }

        } catch (error) {

            console.log("fetchDeleteSession", error);
          
        }
    },

    fetchGetSession: async(endPoint) => {
        try {
            const { data, status } 
                    = await axios.get(`${URL}${endPoint}`,{
                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});
            
                        if (status === 200) {
                            console.log("fetchGetSession", data);
                            return data;
                        }

        } catch (error) {

            console.log("fetchGetSession", error);
          
        }
    },
    
    fetchRoomCount: async(endPoint, history) => {
        try {
            
            const { data, status } 
                    = await axios.put(`${URL}${endPoint}`,{},{
                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});

            console.log("데이터터",data)
            if (status === 200){

                const { status } = data;
                if (status === 'SUCCESS'){
                    return true;
                } else {
                    return false;
                }
            }

        } catch (error) {

            console.log("fetchRoomCount", error);
          
        }
    },

    
    fetchPostOpenvidu: async(endPoint, roomInfo, history) => {
       
        try {
            const { data, status } 
                    = await axios.post(`${URL}${endPoint}`,roomInfo,{

                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});

            
            if (status === 200){
                if (data){
                    return data
                }

                return true;
            }

        } catch (error) {

            console.log("fetchGetOpenvidu", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchGetOpenvidu: async(endPoint, history) => {
       
        try {

            const { data, status } 
                    = await axios.get(`${URL}${endPoint}`,{
                        auth:{
                            username : 'OPENVIDUAPP',
                            password : 'therapist'
                        }});

            
            if (status === 200){
                if (data){
                    return data
                }

                return true;
            }

        } catch (error) {

            console.log("fetchGetOpenvidu", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchGet: async(endPoint, history) => {
        
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
            const { data, status } = await axios.get(`${URL}/${endPoint}`);

            if (status === 200){
                if (data){
                    return data
                }

                return true;
            }

        } catch (error) {

            console.log("fetchGet", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchRegister: async(endPoint, body, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
            const { status } = await axios.post(`${URL}/${endPoint}`, body);

            if (status === 200){
                return true;
            }

        } catch (error) {

            console.log("fetchRegister", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchModify: async(endPoint, body, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
            const { status } = await axios.put(`${URL}/${endPoint}`, body);
            
            if (status === 200){
                return true;
            }

        } catch (error) {

            console.log("fetchModify", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
        }
    },

    fetchDelete: async(endPoint, history) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
            const { status } = await axios.delete(`${URL}/${endPoint}`);
            
            if (status === 200){
                return true;
            }

        } catch (error) {
            
            console.log("fetchDelete", error);
            const { status } = error.response;

            if (status === 401) {
                alert('로그인이 필요한 서비스입니다');
                history.push('/');
            } else if  (status >= 400) {
                history.replace(history.location.pathname, { errorStatusCode: status,
            });
            }
            
        }
    },
};



export default api;