import React, { useEffect, useRef, useCallback, useState } from 'react';
import postApi from '../api/postApi.js';


function useInfiniteScroll( {currentPage, loadAnswerData }) {

    const [ target, setTarget ] = useState(null);

    // const fetchdelay = (delay = 1000) => new Promise(res => setTimeout(res, delay));

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          currentPage.current += 1;
          observer.unobserve(entry.target);
          await loadAnswerData();
          observer.observe(entry.target);
        }
      };
     
    useEffect(() => {

    let observer;
		if (target) {
			observer = new IntersectionObserver(onIntersect, { threshold: 1 });
	    observer.observe(target);
		}
	  return () => observer && observer.disconnect();
        
    }, [target]);

    
    return setTarget;
};

export default useInfiniteScroll;
