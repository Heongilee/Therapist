import {
    BOARD_REQUEST, PAGE_REQUEST, LOADING
} from '../_actions/types';


// const initialState={'category1':[],'category2':[],'category3':[],'category4':[], currentCategory:null };

export default function (state = {}, action) {

    switch(action.type) {
        case LOADING:{
            return { ...state, loadState:true};
        }

        case BOARD_REQUEST:{

            const { posts } = action.payload[0]; 
            // console.log("pageeee",currentPage)
            return { ...state, posts:posts };
            }

        // case BOARD_REQUEST:{
        //     const { postType, posts, totalPage, page } = action.payload.request[0];
        //     const { post } = pageCal(posts, 1, totalPage);
        //     return { ...state, currentType:postType, posts:posts, 
        //         currentPage:page,totalPage:totalPage, post:post,loadState:false};
        // }             
        
        case PAGE_REQUEST:{
            const page = action.payload;
            console.log("bsj", page)
            return { ...state, currentPage:page};
        }
        
        // case PAGE_REQUEST:{
        //     const { post, currentPage } = action.payload;
        //     return { ...state, post:post, currentPage:currentPage,loadState:false
        //     };
        // }

        default:
            return state;
    };
};
// case LOADING: {
//     return { ...state, loading:true};
// }

// case BOARD_REQUEST:{
//     const { posts, post, totalPage,postType, currentPage } = action;
//     return { ...state, posts:posts, post:post, totalPage:totalPage, postType:postType,
//             currentPage:currentPage,loading:false };
// }

