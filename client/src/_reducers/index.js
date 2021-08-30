import { combineReducers } from 'redux';
import socket from './socket_reducer';
import user from './user_reducer';



const rootReducer = combineReducers({
    user, socket
})

export default rootReducer;