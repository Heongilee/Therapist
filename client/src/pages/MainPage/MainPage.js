import React from 'react';
import CardSection from './sections/CardSection.js';
import BoardSection from './sections/BoardSection.js';
import useRecentBoard from '../../hook/useRecentBoard.js';

import './MainPage.css';

function MainPage() {

    const cardData = [1,2,3,4,5];
    const [ PostState, openBoard ] = useRecentBoard();


    return (
        <section className="main_section">
            <div className="wrapper">
                <CardSection cardData={cardData}></CardSection>
                {PostState && <BoardSection postData={PostState}></BoardSection>}
            </div>
        </section>
    )
};

export default MainPage;