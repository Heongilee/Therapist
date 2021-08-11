import {
    BOARD_REQUEST, PAGE_REQUEST
} from '../_actions/types';


export default function (state = {}, action) {

    switch(action.type) {

        case BOARD_REQUEST:{

            const { posts } = action.payload[0]; 
            return { ...state, posts:posts };
            }

        case PAGE_REQUEST:{
            const page = action.payload;
            console.log("bsj", page)
            return { ...state, currentPage:page};
        }
        
            default:
            return state;
    };
};
