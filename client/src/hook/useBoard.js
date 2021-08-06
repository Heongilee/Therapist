import { useEffect, useReducer } from 'react';
import  boardReducer  from '../_reducers/board_reducer.js';
import { BOARD_REQUEST, PAGE_REQUEST } from '../_actions/types.js';
import { requestBoardList, requestPage } from '../api/boardApi';

//커스텀훅
export default function useBoard() {

    const [BoardState, dispatch] = useReducer(boardReducer, { posts:null, totalPage:null, currentPage:null, category });

    useEffect(() => {
        categoryChange();
    }, [])
    

    const categoryChange = (category) => {
        requestBoardList()
            .then(response => {
                const { posts, postLength } = response[0];
                dispatch({ type:BOARD_REQUEST, posts:posts, totalPage:postLength });

            });
    };

    // 페이지 선택
    const pageChange = page => {
        requestPage(page)
            .then(response => {
                const { posts, postLength } = response[0];
                dispatch({ type:PAGE_REQUEST, posts:posts, totalPage:postLength, currentPage:page });
            });
    };

    // 페이지 선택
    
    return {...BoardState, pageChange, categoryChange};
};



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { requestBoardList, requestPage } from '../_actions/board_actions';


// export default function useBoard() {

//     const dispatch = useDispatch();
//     const boardState = useSelector( state=> state.board.boardData );

//     useEffect(() => {
//         dispatch(requestBoardList());
//     }, [dispatch]);
    


//     return boardState;
// };

