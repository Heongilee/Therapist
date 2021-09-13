import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { URL } from '../config/confing.js';
import { loading_actions } from '../_actions/loading_actions.js';
import { LOADING_START, LOADING_END } from '../_actions/types'
import { useDispatch } from 'react-redux';
import axios from 'axios';
 
            
const useQuery = (endpoint) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState();
  
  useEffect(async() => {
    // console.log("endpoint", endpoint)  
    try {

      dispatch(loading_actions.loadingStart());

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios.get(URL + endpoint);

      // console.log("데이터!!!!1",  response)

      const { data, status } = response;

      if (status === 200) {
        setApiData(data);
        dispatch(loading_actions.loadingEnd());
      }
      

    } catch (error) {
      dispatch(loading_actions.loadingReset());

      // dispatch(loading_actions.loadingReset());
      console.log("error", error);

      const { status } = error.response;

      if (status === 401) {
        alert('로그인 하세요');
        history.push('/');
      } else if  (status >= 400) {
        history.replace(history.location.pathname, { errorStatusCode: status,
        });
      }
      
    };
   
  }, [endpoint]);

  return apiData;
};

export default useQuery;