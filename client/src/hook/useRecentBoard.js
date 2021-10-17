import useQuery from './useQuery.js';

const MAIN_ENDPOINT = '/main/posts';


function useRecentBoard() {

    const PostState = useQuery(MAIN_ENDPOINT);
  
    return PostState;

};

export default useRecentBoard;

