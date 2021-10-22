import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { URL } from '../config/confing.js';
import { loading_actions } from '../_actions/loading_actions.js';
import { LOADING_START, LOADING_END } from '../_actions/types'
import { useDispatch } from 'react-redux';
import axios from 'axios';
 
            
const useQuery = (endpoint) => {
  const history = useHistory();
  const [apiData, setApiData] = useState();
  const dispatch = useDispatch();

  useEffect(async() => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios.get(URL + endpoint);
      console.log("res",response)
      const { data } = response;

      setApiData(data);

    } catch (error) {
      console.log("error", error)
      const { status } = error.response;

      if (status === 400) {
        history.replace(history.location.pathname, {
        errorStatusCode: status,
        });
      } 
      else if (status === 401) {
        alert('로그인을 하세요');
      }
    }
   
  }, [endpoint]);

  return apiData;
};

export default useQuery;


