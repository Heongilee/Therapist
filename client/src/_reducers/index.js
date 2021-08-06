import { combineReducers } from 'redux';
import board from './board_reducer';



const rootReducer = combineReducers({
    board
})

export default rootReducer;