import { Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import React from 'react';


function DropButton({ handleMenuClick, info }) {

    const { type=null, userId=null, title=null, content=null,postType=null,
        postId=null, replyId=null, buttonName=null } = info;

    const menu = (
        <Menu onClick={handleMenuClick}>
           <Menu.Item key={'modify'}>
                <Link to={{pathname :`/write`,
                            data : { 
                                "type":type,
                                "userId": userId,
                                "title": title,
                                "content": content,
                                "postId": postId,
                                "replyId": replyId,
                                "buttonName": buttonName,
                                "postType":postType
                }}}>{ "수정" }</Link>
               </Menu.Item>
           <Menu.Item key={'delete'}>{ "삭제" }</Menu.Item>
        </Menu>
    );


    return (
        <>
            <Dropdown.Button overlay={menu}></Dropdown.Button>
        </>
 
    );
};

export default DropButton;
