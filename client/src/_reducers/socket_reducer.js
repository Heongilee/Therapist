import {
    SOCKET_START
} from '../_actions/types';

import { createReducer } from "@reduxjs/toolkit"; 
import { setValueReducer } from '../utils/reduxHelper';


const INITIALSTATE = { connect: false, error:false };

const socket_reducer = createReducer(INITIALSTATE, {
    [SOCKET_START] : (state, action) => ({...state, connect: true})
}); 

export default socket_reducer;

