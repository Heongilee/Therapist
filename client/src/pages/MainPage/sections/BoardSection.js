import React from 'react';
import TextButton from '../../../components/Atoms/TextButton/TextButton.js';
import PostSection  from './PostSection.js';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


import './BoardSection.css';


function BoardSection({ postData }) {

    return (
        <div className="resent_board_section">
                <div className ="resent_board_area">
                    <div className="resent_board_header">
                        <div className="resent_board_header_title">최근 Q&A</div>
                            <Link to="/board">
                                <TextButton type={"secondary"} textName={"더보기"}>
                                </TextButton>
                            </Link>
                    </div>
                    
                    <div className="resent_board_main">
                        <h1></h1>
                        <PostSection postData={ postData.slice(0,3) }></PostSection>
                        <PostSection postData={ postData.slice(3,6) }></PostSection>
                    </div>
                </div>
        </div>
    )
};

export default BoardSection;
