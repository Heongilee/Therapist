import {
    BOARD_REQUEST, PAGE_REQUEST
} from '../_actions/types';

export default function boardReducer(state = {}, action) {

    switch(action.type) {
        case BOARD_REQUEST:
            return { ...state, posts: action.posts, totalPage: action.totalPage };
        
            case PAGE_REQUEST:
            return { ...state, posts: action.posts,  totalPage:action.totalPage, currentPage:action.currentPage };
        
        default:
            return state;
    };
};


// import {
//     BOARD_REQUEST, PAGE_REQUEST
// } from '../_actions/types';

// export default function (state = {}, action) {

//     switch(action.type) {
//         case BOARD_REQUEST:
//             return { ...state, boardData: action.payload };
        
//             case PAGE_REQUEST:
//             return { ...state, boardData: action.payload };
        
//         default:
//             return state;
//     };
// };