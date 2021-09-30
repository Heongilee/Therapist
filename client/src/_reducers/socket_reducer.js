import {
    START_CHANNEL, STOP_CHANNEL, SOCKET_MESSAGE, NOTICE_COUNT, SEND_MESSAGE,
    SET_NOTICE_COUNT 
} from '../_actions/types';

import { createReducer } from "@reduxjs/toolkit"; 
import { setValueReducer } from '../utils/reduxHelper';


 
const INITIALSTATE = { connect: false , message: null, count: 0, sendMessage: null };

const socket_reducer = createReducer(INITIALSTATE, {
    [START_CHANNEL] : (state, action) => ({...state, connect: true }),
    [STOP_CHANNEL] : (state, action) => ({...state, connect: false }),
    [SOCKET_MESSAGE] : (state, action) =>  setValueReducer(state, action),
    [NOTICE_COUNT] : (state, action) =>  ({...state, count: state.count + 1 }),
    [SEND_MESSAGE] : (state, action) =>  ({...state, sendMessage: action.data }),
    [SET_NOTICE_COUNT] : (state, action) =>  ({...state, count: action.data }),
}); 

export default socket_reducer;

