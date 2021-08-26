import React from 'react';
import { Form,Input, Button } from 'antd';
import './WriteForm.css';

const { TextArea } = Input;


function WriteForm({ onFinish=null, onCancel=null }) {

    const tailLayout = {
        wrapperCol: {
          offset: 20,
          span:1,
        },
      };

    return (
        <div className="writePage">
            <div className="writePage_container">
                <div className="writePage_area">
                    <Form onFinish={onFinish}>
                        
                        <Form.Item name="title">
                            <Input/>
                        </Form.Item>

                        <Form.Item name="content">
                            <TextArea style={{height:"240px"}}/>
                        </Form.Item >

                            <Form.Item>
                                <div style={{float:'right'}}>
                                    <Button htmlType="submit">등록</Button>
                                    <Button onClick={ onCancel }>취소</Button>
                                </div>
                            </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default WriteForm;
