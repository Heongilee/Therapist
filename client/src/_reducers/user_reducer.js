import {
    AUTH_USER
} from '../_actions/types';


export default function (state = {}, action) {

    switch(action.type) {

        case AUTH_USER:{
                return { ...state };
            }

            default:
                return state;
    };
};
