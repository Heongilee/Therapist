import React from 'react';
import AvatarField from '../../../components/AvatarField/AvatarField.js';
import StarButton from '../../../components/StarButton/StarButton.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import CommentField from '../../../components/CommentField/CommentField.js';

import './css/AnswerSection.css';


function AnswerSection({ answerData, reply, replyState, commentData }) {

    

    const answerList = answerData.map( (data, index) => {
        
        return  <div className="answer_area" key={index}>
                    <ul className="answer_list">
                        <li className="answer">
                            <div className="answer_header">
                                <AvatarField userid={data.id} grade={data.grade}></AvatarField>
                            </div>
                            <div className="answer_content">
                                <p> { data.content }</p>
                            </div>
                            <div className="answer_footer">
                                <StarButton></StarButton>
                                <MessageIcon iconClick={ reply } clickState={ replyState }></MessageIcon>
                            </div>
                        </li>
                    </ul>
                    {/* { replyState && replyState === true ? <CommentField commentData={commentData}></CommentField> : ''} */}
                </div>
    });

    return (
        <div className="wrapper">
            { answerList }
        </div>     
    );
};

export default AnswerSection;



// import React from 'react';
// import AvatarField from '../../../components/AvatarField/AvatarField.js';
// import StarButton from '../../../components/StarButton/StarButton.js';
// import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
// import './css/AnswerSection.css';


// function AnswerSection({ answerData }) {

//     const answerList = answerData.map( (data, index) => {
        
//         return <ul className="answer_list"><li className="answer" key={index}>
//                 <div className="answer_header">
//                     <AvatarField userid={data.id} grade={data.grade}></AvatarField>
//                 </div>
//                 <div className="answer_content">
//                     <p> { data.content }</p>
//                 </div>
//                 <div className="answer_footer">
//                     <StarButton></StarButton>
//                     <MessageIcon></MessageIcon>
//                 </div>
//             </li></ul>
//     });

//     return (
//         <div className="answer_area">
//                 { answerList }
//         </div>
//     );
// };

// export default AnswerSection;
