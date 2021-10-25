import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import api from '../api/api.js';


function useNotice({PopOverState}) {
    const history = useHistory();
    const currentPage = useRef(0);
    const [ NoticeState, setNoticeState ] = useState({ noticeData:[], loading:false,totalAmount:0 });

    const loadNoticeData = async() => {
        setNoticeState(prev => ({ ...prev, loading: true }));
        
        const endPoint = `notice/${localStorage.getItem('username')}`
        const data = await api.fetchGet(endPoint, history);

        currentPage.current += 1;

        setNoticeState(prev => ({
          noticeData: [...prev.noticeData, ...data.notices],
          totalAmount:data.totalAmount,
          loading: false
        }));
  
      };

    useEffect(() => {
        if (PopOverState){
          loadNoticeData();
        } else {
          setNoticeState({noticeData:[],loading:false,totalAmount:0 });
        }
    }, [PopOverState]);
    


    return { NoticeState:NoticeState, currentPage:currentPage, loadNoticeData };
};

export default useNotice;


