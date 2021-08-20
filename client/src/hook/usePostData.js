import { useAsync } from 'react-async';
import { useState } from 'react';
import postApi from '../api/postApi.js';


const loadPost = async ({}, { signal }) => {
    const questionData = await postApi.fetchQuestion();
    const answerData = await postApi.fetchAnswer();

    return { questionData, answerData };
};


const usePostData = () => {
    const { data, isPending } = useAsync({ promiseFn: loadPost })

    return {data, isPending};
};

export default usePostData;



// import { useState, useEffect } from 'react';
// import postApi from '../api/postApi.js';

// /**
// * Method comment
// *
// * @param {string} PATH - 질문글과 답글 요청을 구분하는 문자열
// */

// function usePostData({ PATH }) {

//     const [postData, setPostData] = useState();

//     useEffect(() => {

//         if(PATH === 'QUESTION'){
//             questionRequest();
//         } else {
//             answerRequest();
//         };

//     }, []);

//     const questionRequest = async() => {

//         const response = await postApi.fetchQuestion();
//         setPostData(response);
//     };

//     const answerRequest = async() => {

//         const response = await postApi.fetchAnswer();
//         setPostData(response);
//     };

//     return postData;
// };

// export default usePostData;
