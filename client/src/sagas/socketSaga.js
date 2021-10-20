import { fork, take, call, put, race } from 'redux-saga/effects';
import createSocketChannel from "./createSocketChannel";
import { SOCKET_URL } from '../config/config.js';
import { START_CHANNEL , STOP_CHANNEL, 
          SOCKET_MESSAGE, NOTICE_COUNT, 
          SEND_MESSAGE,
        } from '../_actions/types';

import { notification } from 'antd';

const NOTICE_TYPE = { reply:'답글', replyComment:'댓글', postComment:'댓글' };

const openNotification = ({ type, data }) => {
  
  const {senderUserName, receivedUserName, postType } = JSON.parse(data);                 
 
  const option = {
    message: '알림',
    description: `${senderUserName.split('@')[0]}님께서 
                  회원님의 글에
                  ${NOTICE_TYPE[postType]}을 달았습니다.`,
    placement:'bottomRight',
  };

  notification[type](option);
};


function * sendMessageSaga(ws) {
  
  while (true) {
    
    const { data } = yield take(SEND_MESSAGE);
    
    ws.send(
      JSON.stringify(data))
  }

};

function * initializeWebSocketsChannel() {
  

  const ws = new WebSocket(SOCKET_URL);
  const channel = yield call(createSocketChannel, ws);

  yield fork(sendMessageSaga, ws);

  while (true) {

      const { data } = yield take(channel);
      
      yield put({
        type: SOCKET_MESSAGE,
        key: 'message',
        data: data
      });
      
      yield put({ // push count
        type: NOTICE_COUNT,
      });

      yield call(openNotification,{type:'open',data:data});
  }


};


function * socketSaga() {

  while (true) {
      yield take(START_CHANNEL);
      yield call(initializeWebSocketsChannel)
      yield race({
          task: call(initializeWebSocketsChannel),
          cancel: take(STOP_CHANNEL),
      });

      // ws.close();
  }
};

export default socketSaga;

