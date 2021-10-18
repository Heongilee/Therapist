import { useEffect, useState } from 'react';


function useInfiniteScroll( { currentPage, loadData, totalpage }) {
    const [ target, setTarget ] = useState(null);

    const onIntersect = async ([entry], observer) => {

        if (currentPage.current === 0){ //첫번째 페이지
          return;
        }

        if (entry.isIntersecting) { //마지막페이지
            if(currentPage.current === totalpage/6){
              observer.unobserve(entry.target);
              return;
            }

            if (currentPage.current < totalpage/6){
              observer.unobserve(entry.target);
              await loadData();
              observer.observe(entry.target);
            } else {
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
