import React from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";
import './WriteLinkButton.css';


function WriteLinkButton({ data }) {

    const { type=null, userId=null, title=null, content=null, 
        postId=null, replyId=null, buttonName=null } = data;


    return (
            <Button> <Link to={{pathname :`/write`,
                    data : { 
                        "type":type,
                        "userId": userId,
                        "title": title,
                        "content": content,
                        "postId": postId,
                        "replyId": replyId,
                        "buttonName": buttonName
            }}}>{ buttonName }</Link></Button>
    );
};

export default React.memo(WriteLinkButton);
