import axios from 'axios';


export const userApi = ({ method, url, params, data }) => {
    console.log("url", method, url, params, data)
    return axios({
      url,
      method,
      baseURL:"http://localhost:8080",
      params,
      data,
      withCredentials: true,
    });
};
  

