import { useState, useRef, useEffect } from 'react';



function Slide({ totalRoom }) {
    
    // 현재 보여지고 있는 슬라이더 한줄(한줄당 4개)
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideRef = useRef(null);

    useEffect(() => {
        slideRef.current.style.transition = "transform 1s";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; 
      }, [currentSlide]);

    // 왼쪽
    const prevSlide = () => {   
        if (currentSlide !== 0){
            setCurrentSlide(currentSlide - 1);
        }
    };
    
    // 오른쪽
    const nextSlide = () => {
        if (totalRoom / 4 > currentSlide + 1){
            setCurrentSlide(currentSlide + 1);
        }
    };


    return { prevSlide, nextSlide, slideRef, currentSlide };
};

export default Slide;
