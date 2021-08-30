import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ModalPortal from '../../../../portal/ModalPortal.js';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { user_actions } from '../../../../_actions/user_actions';

import './RightMenu.css';

const { Kakao } = window;

function RightMenu() {
    
    const dispatch =  useDispatch();
    const history = useHistory();
    const temp = 2;
    
    const kakaoLoginClickHandler = () => {
            Kakao.Auth.login({
                success: function (authObj) {
                    fetch(`${"http://localhost:8080/auth/kakao/callback?accessToken="+authObj.access_token}`, {
                            method: "GET",
                        })
                        .then(res => res.json())
                        .then(res => {
                            console.log("res.access_token", res)
                            localStorage.setItem("token", res.token);
                            
                            if (res.token) {
                                alert("welcome")
                                history.push("/");
                            }
                        })
            },
            
            fail: function (err) {
                alert(JSON.stringify(err))
            }
        })
    };

    if(localStorage.getItem('token')) {

        return (
            <div className="nav_menu_right">
                <Link to='/mypage'><div style={{marginRight:'1rem'}}>MyPage</div></Link>
                <div>Logout</div>
            </div>
        );

    } else {
           
    return (
        <div className="nav_menu_right">
            <div onClick={kakaoLoginClickHandler}>Login</div>
        </div>
    );
}


export default RightMenu;
