import React from 'react';
import AvatarField from '../../../components/atoms/AvatarField/AvatarField.js';
import StarButton from '../../../components/StarButton/StarButton.js';
import MessageIcon from '../../../components/MessageIcon/MessageIcon.js';
import CommentField from '../../../components/CommentField/CommentField.js';
import PaginationCmp from '../../../components/Pagination/PaginationCmp.js';
import ReplyField from '../../../components/ReplyField/ReplyField.js';
import './css/AnswerSection.css';


function AnswerSection({ answerData, commentData, replyOnClick, replyState }) {

    

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
                                <div onClick={() => replyOnClick(index)}>
                                    <MessageIcon></MessageIcon>
                                </div>
                            </div>
                        </li>
                    </ul>

                        {/*   댓글 작성   */}

                        { replyState[index] === true ? [ 
                            <ReplyField key={ data.id + index }></ReplyField>,
                            <CommentField key={ data.id } commentData={ commentData }></CommentField>,
                            <PaginationCmp key={ index } />]: ''}
                    
                </div>
    });
    

    return (
        <div className="wrapper">
            { answerList }
        </div>     
    );
};

export default AnswerSection;

{/*   댓글 작성   */}
// { replyState[index] === true ? [ 
                            
//     <div className="input_area" key={ data.id + data.id }>
//         <TextField placeholder={ "댓글을 작성하세요" }></TextField>
//     </div>,
    
//     <div className="input_area_button" key={ data.id + index }>
//         <ModernButton ButtonName={ "댓글 작성" }></ModernButton>
//     </div>,
    
//     <CommentField key={data.id} commentData={commentData}></CommentField>,
//     <PaginationCmp key={index} />]: ''}