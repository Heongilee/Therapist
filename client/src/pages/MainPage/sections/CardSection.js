import React from 'react';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import './CardSection.css';

function CardSection({ cardData }) {
    

    const cardList = cardData.map((data, index) => {
         
        return <li className="card" key={"data" + index}>
                    <div className="card_img">
                    </div>
              </li>
    });

    
    return (
            <ul className="card_list">
                <div className="card_left_arrow">
                        <LeftCircleFilled />
                    </div>
                <div className="card_area">
                    

                    { cardList }
                </div>

                <div className="card_right_arrow">
                        <RightCircleFilled />
                </div>
            </ul>
    );
};

export default CardSection;

// import React from 'react';
// import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
// import './CardSection.css';

// function CardSection({ cardData }) {
    

//     const cardList = cardData.map((data, index) => {
         
//         return <li className="card" key={"data" + index}>
//                     <div className="card_img">
//                     </div>
//               </li>
//     });

    
//     return (
//         <div className="card_area">
//             <ul className="card_list">
//                 <div className="card_left_arrow">
//                     <LeftCircleFilled />
//                 </div>

//                 { cardList }

//                 <div className="card_right_arrow">
//                     <RightCircleFilled />
//                 </div>
//             </ul>
//         </div>
//     );
// };

// export default CardSection;
