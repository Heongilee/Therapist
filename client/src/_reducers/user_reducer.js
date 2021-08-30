import {
    LOGIN_REQUEST,
    SAVE_TOKEN
} from '../_actions/types';

import { createReducer } from "@reduxjs/toolkit"; 
import { setValueReducer } from '../utils/reduxHelper';


const INITIALSTATE = { token:null };

const user_reducer = createReducer(INITIALSTATE, {
    [SAVE_TOKEN] : setValueReducer
}); 

export default user_reducer;

