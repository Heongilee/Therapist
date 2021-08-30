import axios from 'axios';
import { message } from 'antd';


export function userApi({ method, url, params, data }) {
    
    return axios({
      url,
      method,
      baseURL:"http://localhost:8080",
      params,
      data,
      withCredentials: true,
    }).then(response => {

      const { success, token } = response.data;

      return {
        success: success,
        token: token
  
      };
    });
}
  


// const userApi = {

//     fetchLogin: async({ name, password }) => {
//         try {
            
//             const response = await axios.get(LOGIN_API);
//             return response;
    
//         } catch (error) {
//             console.log("fetchAnswer", error);
//         }
        
//     },
// }

// export default userApi;