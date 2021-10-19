import React, { useEffect, useState } from 'react';
import AvatarField from '../../../components/Atoms/AvatarField/AvatarField.js';
import api from '../../../api/api.js';
import { StarOutlined, StarTwoTone, StarFilled } from '@ant-design/icons';
import './MyInfoCard.css';


function MyInfoCard() {

    const [MyInfoState, setMyInfoState] = useState();

    useEffect(async() => {
        const endpoint = `mypage/info/${localStorage.getItem('username')}`;
        const response = await api.fetchGet(endpoint);
        setMyInfoState(response);
    }, [])


    return (
        <div className="wrapper">
            {MyInfoState && 
                <ul className="myinfo_container">
                <li className="myinfo_card">
                    <div className="myinfo_card_area">
                        
                        <div className="myinfo_card_header">
                            <AvatarField/>
                            <span>{localStorage.getItem('username').split('@')[0]}</span>
                            <span>{'@'+localStorage.getItem('username').split('@')[1]}</span>

                        </div>

                        <div className="myinfo_card_content">
                            <div className="myinfo_card_content_items">
                                <span>{"내가 쓴 글　"}</span>
                                <span>{MyInfoState.userPostsLength}</span>
                            </div>
                            
                            <div className="myinfo_card_content_items">
                                <span>{"내가 쓴 답글"}</span>
                                <span>{MyInfoState.userRepliesLength}</span>
                            </div>

                            <div className="myinfo_card_content_items">
                                <span>{"내가 쓴 댓글"}</span>
                                <span>{MyInfoState.userCommentsLength}</span>
                            </div>
                          
                        </div>

                    </div>
                </li>
                <li className="myinfo_card">
                <div className="myinfo_card_area">

                        <div className="myinfo_card_header">
                            <span>{"등급"}</span>
                        </div>
                        <div className="myinfo_card_content_grade_star">
                            <span>{MyInfoState.userGrade}</span>
                        </div>

                    </div>
                </li>
                
                <li className="myinfo_card">
                    <div className="myinfo_card_area">

                        <div className="myinfo_card_header">
                            <span>{"평점"}</span>
                        </div>
                        <div className="myinfo_card_content_grade_star">
                            <span><StarFilled style={{color:"#ffff00"}} />{MyInfoState.userStars}</span>
                        </div>

                    </div>
                </li>
            </ul>
            
            }
            
        </div>
    );
};

export default MyInfoCard;
