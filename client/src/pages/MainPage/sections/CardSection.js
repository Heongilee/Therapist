import React from 'react';
import './css/cardSection.css';

function CardSection({ cardData }) {
    

    const cardList = cardData.map((data, index) => {
         
        return <li className="card" key={index}></li>
    })


    return (
        <div className="wrapper">
            <ul className="card_container">
                {cardList}
            </ul>
        </div>
    )
};

export default CardSection;
