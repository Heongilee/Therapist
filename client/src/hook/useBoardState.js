import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useGetQuery from './useGetQuery.js';
import useQuery from '../hook/useQuery.js';


function useBoardState({ PATH, ENDPOINT='', ININIAL_POSTTYPE='', userName }) {
    const { page, postType } = useGetQuery();

    const TotalBoard = useQuery(`${ENDPOINT}${userName ? '/' + userName + '?menuType=': ''}${postType ? postType : ININIAL_POSTTYPE}`);


    const [BoardState, setBoardState] = useState({ 
        currentPage: page ? page : 1, postType:postType ? postType : ININIAL_POSTTYPE});
    
    const history = useHistory();

    const categorySelect = key => {
        history.push(`/${PATH}?postType=${key}&page=${1}`);
    };

    const pageSelect = (page) => {
        history.push(`/${PATH}?postType=${BoardState.postType}&page=${page}`);
    }
   
    useEffect(() => {
        setBoardState({...BoardState, currentPage: page ? page : 1, 
                                    postType:postType ? postType : ININIAL_POSTTYPE });
    }, [page, postType]);

   
 
    return { BoardState, categorySelect, pageSelect, TotalBoard };


};

export default useBoardState;


