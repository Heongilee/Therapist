import React from 'react';
import { Form, Input, Button } from 'antd';
import './CommentForm.css';

const { TextArea } = Input;


function CommentForm({ onFinish, userId }) {
    return (
            <Form onFinish={({ comment })=> onFinish(userId, { comment })}>

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

