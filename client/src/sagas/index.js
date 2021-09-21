import socketSaga from './socketSaga.js';
import loadingSaga from './loadingSaga.js';

import { all, fork } from 'redux-saga/effects';





function* rootSaga() {
    yield all([
        yield fork(loadingSaga),
        // yield fork(socketSaga)
    ]);
};
  
export default rootSaga;
