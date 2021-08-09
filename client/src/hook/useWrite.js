import { useEffect, useReducer } from 'react';
import  boardReducer  from '../_reducers/board_reducer.js';
import { BOARD_REQUEST, PAGE_REQUEST } from '../_actions/types.js';
import { requestBoardList, requestPage } from '../api/boardApi';

//커스텀훅
export default function useWrite() {

    
    
};

// 글쓰기버튼 클릭 => 보내짐 => boardpage로 전환

