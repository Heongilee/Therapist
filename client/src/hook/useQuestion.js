import useQuery from '../hook/useQuery.js';


import { useHistory } from "react-router-dom";


function useQuestion({ postId }) {

    const QuestionData = useQuery(`/posts/${postId}`);
    const history = useHistory();

    const modifyButton = () => {
        history.push(`/${PATH}?category=${key}&page=${'1'}`);
        console.log("QuestionData", QuestionData)
    };

  
    

    return { QuestionData:QuestionData, modifyButton };
};

export default useQuestion;


