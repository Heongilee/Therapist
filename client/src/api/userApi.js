import axios from 'axios';
import { message } from 'antd';


export function userApi({ method, url, params, data }) {
    console.log("url", url)
    return axios({
      url,
      method,
      baseURL:"http://localhost:8080",
      params,
      data,
      withCredentials: true,
    }).then(response => {
      console.log("response", response)
      const { token } = response.data;

      return {
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