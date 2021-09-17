import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import api from '../api/api.js';


function useNotice() {
    const history = useHistory();
    const currentPage = useRef(0);
    const [ NoticeState, setNoticeState ] = useState({ noticeData:[], loading:false });

    const loadNoticeData = async() => {
        setNoticeState(prev => ({ ...prev, loading: true }));
        
        const endPoint = `notice/${localStorage.getItem('username')}`
        const data = await api.fetchGet(endPoint, history);
        console.log("loadNoticeData", data)

        currentPage.current += 1;

        setNoticeState(prev => ({
          noticeData: [...prev.noticeData, ...data.notices],
          loading: false
        }));
  
      };
  
    useEffect(() => {
        loadNoticeData();
    }, []);
    


    return { NoticeState:NoticeState, currentPage:currentPage, loadNoticeData };
};

export default useNotice;


