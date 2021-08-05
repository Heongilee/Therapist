import React from 'react';
import WriteForm from '../../components/WriteForm/WriteForm.js'
import { withRouter } from "react-router-dom";


function WritePage({ history }) {
    
    const onFinish = ({category, title, content}) => {
        console.log('Success:', category, title, content);
    };
      
    return (
        <WriteForm  onFinish={onFinish} history={history} ></WriteForm>
    );
};


export default withRouter(WritePage);

