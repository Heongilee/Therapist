import React, { useCallback } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import useNotice from '../../hook/useNotice.js';
import InfiniteArea from '../InfiniteArea/InfiniteArea.js';
import { Link } from 'react-router-dom';

import "react-perfect-scrollbar/dist/css/styles.css";
import "./PopOverContent.css";

const NOTICE_TYPE = {reply:'답글', replyComment:'댓글', postComment:'댓글'};

function PopOverContent({ setPopOverState, PopOverState }) { 

  const { NoticeState, currentPage, loadNoticeData } = useNotice({ PopOverState });

  const { noticeData, totalAmount, loading } = NoticeState;

  const onClick = () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = '';
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
          setPopOverState(false);
  };


  const noticeList = useCallback(() => noticeData && 
            noticeData.map( (data, index) => {
            const type = data.type;
            return <div key={"notice"+index} className='notice_content'>
                    <Link to={`/posts/${data.postId}`} onClick={onClick}>
                      <p>{data.senderUsername.split('@')[0]+'님께서 '}
                          {'회원님의 글에 '+ 
                            NOTICE_TYPE[type] + '을 다셨습니다'}.</p></Link>
                  </div>
             
        }), [noticeData, currentPage])



  return (
    <PerfectScrollbar style={{ maxHeight: "200px" }}>
          <div>
          {
            noticeData && noticeList()
          }
          </div>
      
          

        {totalAmount ?
                <InfiniteArea currentPage={currentPage} loadData={loadNoticeData}
                totalpage={totalAmount} loading={loading}>
                </InfiniteArea>:null
            } 

    </PerfectScrollbar>
  );
}

export default PopOverContent;