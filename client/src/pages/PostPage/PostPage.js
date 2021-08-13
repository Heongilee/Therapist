import React, { useState } from 'react';
import QuestionSection from './Sections/QuestionSection.js';
import AnswerSection from './Sections/AnswerSection.js';
import { withRouter } from "react-router-dom";
import './PostPage.css';


function PostPage() {

    return (
        <section className="postPage">
            <div className="wrapper">
                <QuestionSection></QuestionSection>
            </div>

            <div className="wrapper">
                <AnswerSection></AnswerSection>
            </div>
            
        </section>
    );
};



export default withRouter(PostPage);
