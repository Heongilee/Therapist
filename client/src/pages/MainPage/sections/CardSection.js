import React from 'react';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import useSlide from '../../../hook/useSlide.js';
import AvatarField from '../../../components/Atoms/AvatarField/AvatarField.js';
import './CardSection.css';

function CardSection({ cardData, showWriteModal }) {
    
    const { prevSlide, nextSlide, slideRef } = useSlide({ totalRoom:cardData.length});
    
    
    const cardList = cardData.map((data, index) => {
         
        return <li className="card" key={"data" + index} onClick={() => showWriteModal(data.sessionId)}>
                    <div className="card_img">
                        <div className="card_wrapper">
                                <div className="card_header">
                                        <AvatarField/>
                                        {data.sessionTitle}
                                </div>
                                <div className="card_content">
                                        {data.content}
                                </div>
                        </div>
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
                
                {cardData.length > 4 &&
                        <>
                        <button onClick={ prevSlide } className="card_left_arrow">
                                <LeftCircleFilled />
                        </button>
                        <button onClick={ nextSlide } className="card_right_arrow">
                                <RightCircleFilled />
                        </button>
                        </>
                }
                

        </div>
    );
};

export default CardSection;
