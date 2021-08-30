import loginSaga from './loginSaga.js';
import socketSaga from './socketSaga.js';

import { all, fork } from 'redux-saga/effects';



function* rootSaga() {
    // yield all([
    // //   fork(loginSaga),
    // socketSaga()
    // ]);
    yield fork(socketSaga, 'update');
};
  
export default rootSaga;


// import { fork, take, call } from 'redux-saga/effects';
// import { createSocketChannel } from './createSocketChannel';

// function* onMessage(type) {
//   const channel = yield call(createSocketChannel, type);

//   while (true) {
//     try {
//       const message = yield take(channel);

//       console.log(message);
//     } catch (e) {
//       alert(e.message);
//     }
//   }
// }