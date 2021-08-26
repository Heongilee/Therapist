import React from 'react';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import useSlide from '../../../hook/useSlide.js';
import './CardSection.css';

function CardSection({ cardData }) {
    
    const { prevSlide, nextSlide, slideRef } = useSlide({ totalRoom:cardData.length});


    const cardList = cardData.map((data, index) => {
         
        return <li className="card" key={"data" + index}>
                    <div className="card_img">
                    </div>
              </li>
    });


    return (
        <div className="card_container">
                <div className="card_area">
                        <ul className="card_list" ref={ slideRef }>
                                { cardList }
                        </ul>
                </div>

                <button onClick={ prevSlide } className="card_left_arrow">
                        <LeftCircleFilled />
                </button>
                <button onClick={ nextSlide } className="card_right_arrow">
                        <RightCircleFilled />
                </button>

        </div>
    );
};

export default CardSection;
