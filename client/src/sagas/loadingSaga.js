import { fork, take, call, put, race} from 'redux-saga/effects';
import { LOADING_START, LOADING_END, LOADING, LOADING_RESET } from '../_actions/types';
import { eventChannel, END } from 'redux-saga';



function progress(num) {
    return eventChannel(emitter => {
      const count = setInterval(() => {
        num += Math.random() * 7;
        
        if (num < 95) emitter(num);
        else {
          emitter(END);
        }
      }, 50);
      return () => {
        // emitter(100)
        clearInterval(count);
      };
    });
  }



function* loadingSaga() {

    yield take(LOADING_START);  
    const chan = yield call(progress, 10);

    while (true) {
        
        let { num, cancel } = yield race({
            num: take(chan),
            cancel: take(LOADING_END)
          });

        if (cancel) {
            yield put({type:LOADING_RESET })
            break;
        }
        yield put({type:LOADING, progress:num})

        
    }
};

export default loadingSaga;

