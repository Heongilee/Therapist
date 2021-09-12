import { fork, take, call, put} from 'redux-saga/effects';
import { LOADING_START, LOADING_END } from '../_actions/types';

function* loadingSaga() {

    while (true){
        
        yield take(LOADING_START);

        
        yield take(LOADING_END);
    }

};

export default loadingSaga;
