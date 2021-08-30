import { fork, take, call} from 'redux-saga/effects';
import createSocketChannel from "./createSocketChannel";
import socketIOClient from 'socket.io-client';
// import createSocketConnection from '../socket';


function * initializeWebSocketsChannel() {
  console.log("going to connect to WS")
  const channel = yield call(createSocketChannel);
  while (true) {
      const { data } = yield take(channel);
      console.log("data", data)
  }
}

function * socketSaga() {
  while (true) {
      // yield take(START_CHANNEL);
      yield call(initializeWebSocketsChannel)
      // yield race({
      //     task: call(initializeWebSocketsChannel),
      //     cancel: take(STOP_CHANNEL),
      // });

      //if cancel wins the race we can close socket
      ws.close();
  };
};

export default socketSaga;

// import { fork, take, call} from 'redux-saga/effects';
// import { SOCKET_START } from '../_actions/types';
// import createSocketChannel from "./createSocketChannel";
// import socketIOClient from 'socket.io-client';
// import createSocketConnection from '../socket';


// function* socketSaga(type) {

//     // yield take(SOCKET_START);
//     const socket = yield call(createSocketConnection)


//     const socketChannel = yield call(createSocketChannel, socket)

//     while (true) {
//         try {
          
//         console.log("어디서막힌걸까")

//         const message = yield take(socketChannel);
    
//         console.log(message);

//         } catch (error) {
//           alert(error.message);
//         }
//     }
    
// };

// export default socketSaga; 

