import { combineReducers } from 'redux';
import socket from './socket_reducer';
import loading from './loading_reducer';



const rootReducer = combineReducers({
    socket: socket,
    loading: loading
})

export default rootReducer;