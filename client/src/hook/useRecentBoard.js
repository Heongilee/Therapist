import useQuery from './useQuery.js';
import { MAIN_ENDPOINT } from '../config/confing.js';

function useRecentBoard() {

    const PostState = useQuery(MAIN_ENDPOINT);
  
    return PostState;

};

export default useRecentBoard;

