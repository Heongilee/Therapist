import React from 'react';
import { Form, Input, Button } from 'antd';


const { TextArea } = Input;

import './CommentForm.css';


function CommentForm({ onFinish }) {
    return (
            <Form onFinish={onFinish}>
                <Form.Item name="comment">
                    <div className="reply_area">
                        <TextArea placeholder={ "댓글을 작성하세요"}/>  
                    </div>
                </Form.Item>

                <Form.Item name="button">
                    <div className="reply_button">
                        <Button htmlType="submit">댓글 작성</Button>
                    </div>
                </Form.Item>
                
            </Form>
    );
};

export default CommentForm;



// import React from 'react';
// import TextField from '../atoms/TextField/TextField.js';
// import ModernButton from '../atoms/ModernButton/ModernButton.js';
// import './CommentForm.css';


// function CommentForm({TextFieldChange, handleButtonClick}) {
//     return (
//             <form>
//             <div className="reply_area">
//                 <TextField placeholder={ "댓글을 작성하세요" } 
//                     ></TextField>
//                 <div className="reply_button">
//                     <ModernButton handleButtonClick={ handleButtonClick }ButtonName={ "댓글 작성" }></ModernButton>
//                 </div>
//             </div>
//             </form>
//     );
// };

// export default CommentForm;
