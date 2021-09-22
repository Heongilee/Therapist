import React, { useCallback } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import useNotice from '../../hook/useNotice.js';
import InfiniteArea from '../InfiniteArea/InfiniteArea.js';

import { Divider } from "antd";
import { Link } from 'react-router-dom';

import "react-perfect-scrollbar/dist/css/styles.css";

import "./PopOverContent.css";




function PopOverContent() { 

  const { NoticeState, currentPage, loadNoticeData } = useNotice();

  const { noticeData, loading } = NoticeState;

  const noticeList = useCallback(() => noticeData && 
            noticeData.map( (data, index) => {
            return <div key={"notice"+index}>
                      <p>`${index}` + invanda님께서 bsj님의 댓글을 다셨습니다.</p>
                      <Divider/>
                  </div>
             
        }), [noticeData, currentPage])



  return (
    <PerfectScrollbar style={{ height: "350px" }}>
        <div>
          {
            noticeData && noticeList()
          }
          
        </div>

        {noticeData && 
                <InfiniteArea currentPage={currentPage} loadData={loadNoticeData}
                totalpage={8} loading={loading}
                >
                </InfiniteArea>     
            } 

    </PerfectScrollbar>
  );
}

export default PopOverContent;