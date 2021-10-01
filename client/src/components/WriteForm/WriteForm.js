import React from 'react';
import { Form,Input, Button } from 'antd';
import './WriteForm.css';

const { TextArea } = Input;


function WriteForm({ onFinish=null, onCancel=null }) {

    
    return (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: '!!!!!!',
              },
            ]}
          >
            <Input />
          </Form.Item>

        <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: '!!!!!!',
              },
            ]}
        >
            <Input />
        </Form.Item>

        </Form>
      );
};

export default WriteForm;
