import { useEffect, useState } from 'react';


function useInfiniteScroll( { currentPage, loadAnswerData, totalpage }) {
    // console.log("totalpage",currentPage, totalpage,Math.ceil( totalpage/6))
    const [ target, setTarget ] = useState(null);
  
    const onIntersect = async ([entry], observer) => {
        
        // if (currentPage.current === 0) {
        //   currentPage.current += 1;
        //   return;
        // }
        

        if (entry.isIntersecting) {
            if(currentPage.current === totalpage/6){
              console.log("currentPage.current", currentPage.current)
              return;
            }

            if (currentPage.current < totalpage/6){
              // currentPage.current += 1;
              observer.unobserve(entry.target);
              await loadAnswerData();
              observer.observe(entry.target);
            } else {
              console.log("dd")
              currentPage.current += 1;
              observer.unobserve(entry.target);
            }
        }
        
      };
     
    useEffect(() => {

    let observer;
		if (target) {
			observer = new IntersectionObserver(onIntersect, { threshold: 1 });
	    observer.observe(target);
    }

    // 컴포넌트가 언마운트될때, 옵저버 객체가 존재하면 관찰 중지.
	  return () => observer && observer.disconnect();
        
    }, [target]); // 의존성 배열에 target을 둬서 변화할 때 실행한다

    
    return setTarget;
};

export default useInfiniteScroll;



// import React, { useEffect, useRef, useCallback, useState } from 'react';
// import postApi from '../api/postApi.js';


// function useInfiniteScroll( { currentPage, loadAnswerData }) {

//     const [ target, setTarget ] = useState(null);

//     const onIntersect = async ([entry], observer) => {
//         if (currentPage.current === 0) {
//           currentPage.current += 1;
//           return;
//         }
        
//         if (entry.isIntersecting) {
//             console.log("무한");
//             currentPage.current += 1;
//             observer.unobserve(entry.target);
//             await loadAnswerData();
//             observer.observe(entry.target);
           
//         }
        
//       };
     
//     useEffect(() => {

//     let observer;
// 		if (target) {
// 			observer = new IntersectionObserver(onIntersect, { threshold: 1 });
// 	    observer.observe(target);
//     }

//     // 컴포넌트가 언마운트될때, 옵저버 객체가 존재하면 관찰 중지.
// 	  return () => observer && observer.disconnect();
        
//     }, [target]); // 의존성 배열에 target을 둬서 변화할 때 실행한다

    
//     return setTarget;
// };

// export default useInfiniteScroll;
