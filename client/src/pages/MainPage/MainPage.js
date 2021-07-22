import React from 'react';
import CardSection from './sections/CardSection.js';
import BoardSection from './sections/BoardSection.js';

import './style.css';

function MainPage() {

    const cardData = [1,2,3,4];
    

    return (
        <section className="main_section">
            <CardSection cardData={cardData}></CardSection>
            <BoardSection boardData={boardData}></BoardSection>
        </section>
    )
};


const boardData = [
{
    "id":"1",
},

{
    "id":"2",

},


{
    "id":"3",

},
{
    "id":"1",
},

{
    "id":"2",

},


{
    "id":"3",

}

]
export default MainPage;