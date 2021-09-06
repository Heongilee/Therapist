import {
    LOADING_START, LOADING_END
} from '../_actions/types';

import { createReducer } from "@reduxjs/toolkit"; 


const INITIALSTATE = { loadingState: false };

const socket_reducer = createReducer(INITIALSTATE, {
    [LOADING_START] : (state, action) => ({ ...state, loadingState: true }),
    [LOADING_END] : (state, action) => ({ ...state, loadingState: false }),
   
}); 

export default socket_reducer;

