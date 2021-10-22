import {
    LOADING_START, LOADING_END, LOADING_RESET, LOADING
} from '../_actions/types';

import { createReducer } from "@reduxjs/toolkit"; 


const INITIALSTATE = { loadingState: false, progress: 0 };

const socket_reducer = createReducer(INITIALSTATE, {
    [LOADING_START] : (state, action) => ({ ...state, loadingState: true }),
    [LOADING] : (state, action) => ({ ...state, progress: action.progress}),
    [LOADING_END] : (state, action) => ({ ...state, loadingState: false }),
    [LOADING_RESET] : (state, action) =>  ({...state, loadingState: false, progress: 100 }),
}); 

export default socket_reducer;


