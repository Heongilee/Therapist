import queryStirng from 'query-string';
import { useHistory } from "react-router-dom";


const useGetQuery = () => {
    const history = useHistory();
    const { search } = history.location;
    const queryObj = queryStirng.parse(search);

    
   
    return queryObj
    
};

export default useGetQuery;