import React from 'react';
import TextButton from '../../../components/atoms/TextButton/TextButton.js';
import PostSection  from './PostSection.js';
  
import './BoardSection.css';


/**
* @param {Array.<{postId:number, postType:string, postTitle:string, 
                                 postContent:string, replyLength:number }>} postData 
*/

function BoardSection({ postData }) {

    return (
        <div className="resent_board_section">
                <div className ="resent_board_area">
                    
                    <div className="resent_board_header">
                        <div className="resent_board_header_title">최근 Q&A</div>
                            <TextButton type={"secondary"} textName={"더보기"}></TextButton>
                    </div>
                    
                    <div className="resent_board_main">
                        <PostSection postData={ postData.slice(0,3) }></PostSection>
                        <PostSection postData={ postData.slice(3,6) }></PostSection>
                    </div>
                </div>
        </div>
    )
};

export default BoardSection;


// import React from 'react';
// import ModernButton from '../../../components/atoms/ModernButton/ModernButton.js';
// import PostSection  from './PostSection.js';

// import './BoardSection.css';


// /**
// * @param {Array.<{postId:number, postType:string, postTitle:string, 
//                                  postContent:string, replyLength:number }>} postData 
// */

// function BoardSection({ postData }) {

//     console.log("대답", postData)

//     const leftSection = postData.slice(0,3).map((data, index) => {
        
//         return <li className="resent_post_area" key={ "data" + index }>
//                         <div className="resent_post">
//                             <div className="resent_post_header">
//                                 <div>{data.postTitle} {'('}{data.postType}{')'} </div>   
//                                 <div>{data.postContent}</div>
//                             </div>
//                                 <div className="resent_post_footer">
//                                     <div>답변 { data.replyLength }</div>
//                                 </div>
//                         </div>
//                 </li>
//         });

//     const rightSection = postData.slice(3,6).map((data, index) => {
        
//         return <li className="post_area" key={ "data" + index }>
//                         <div className="post">
//                             <div className="post_header">
//                                 <div>{data.postTitle} {'('}{data.postType}{')'} </div>   
//                                 <div>{data.postContent}</div>
//                             </div>
//                                 <div className="post_footer">
//                                     <div>답변 { data.replyLength }</div>
//                                 </div>
//                         </div>
//                 </li>
//         });
//     // const rightSection = postData.slice(3,6).map(( data, index )=> {

//     //     return <li className="board" key={ index }> </li>
//     // });


//     return (
//         <div className="resent_board_section">
//             <div className ="wrapper">
//                 <div className ="resent_board_area">
                    
//                     <div className="resent_board_header">
//                         <div className="board_header_title">최근 Q&A</div>
//                         <ModernButton ButtonName={"더보기"}></ModernButton>
//                     </div>
                    
//                     <div className="resent_board_main">
//                         <ul className="resent_board_list">
//                             { leftSection }
//                         </ul>
//                         <ul className="resent_board_list">
//                             {/* { rightSection } */}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default BoardSection;