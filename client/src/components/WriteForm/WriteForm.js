import React from 'react';
import { Form,Input, Select, Button } from 'antd';
import './WriteForm.css';

const { TextArea } = Input;
const { Option } = Select;


function WriteForm({ onFinish, history}) {

    const tailLayout = {
        wrapperCol: {
          offset: 19,
        },
      };

    return (
        <section className="writePage">
            <div className="wrapper">
                <div className="writePage_area">
                    <Form onFinish={onFinish}>
                        
                            <Form.Item name="category">
                                <Select placeholder="게시판 선택" style={{ width: 120 }} >
                                    <Option value="category1">category 1</Option>
                                    <Option value="category2">category 2</Option>
                                    <Option value="category3">category 3</Option>
                                    <Option value="category4">category 4</Option>
                                </Select>
                            </Form.Item>

                        <Form.Item name="title">
                            <Input/>
                        </Form.Item>

                        <Form.Item name="content">
                            <TextArea style={{height:"350px"}}/>
                        </Form.Item >

                            <Form.Item {...tailLayout}>
                                <Button htmlType="submit">등록</Button>
                                <Button onClick={()=> history.goBack()}>취소</Button>
                        </Form.Item>
                        
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default WriteForm;
