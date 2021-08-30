import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ModalPortal from '../../../../portal/ModalPortal.js';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { user_actions } from '../../../../_actions/user_actions';

import './RightMenu.css';

// const { kakao } = window;

function RightMenu() {
    
    const dispatch =  useDispatch();

    const history = useHistory();

    const temp = 2;
    // const LOGIN_API = "http://localhost:8080/login";
    const LOGIN_API = "/login";

    //method = 'get', url, params, data
    const case_1 = () => {

        const info = {
            method:'get',
            url:LOGIN_API,
            data :{
            name: "invanda",
            password: "code101"}
        }

        dispatch(user_actions.fetchLogin(info))
    };

    const case_2 = () => {


    };


    // const onClick = () => {
    //     Kakao.Auth.login({
    //         success: function(response) {
    //           console.log(response);
    //         },
    //         fail: function(error) {
    //           console.log(error);
    //         },
    //       });
    // };

    if (temp === 1){

        return (
            <div className="nav_menu_right">
                <Link to='/mypage'><div style={{marginRight:'1rem'}}>MyPage</div></Link>
                <div>Logout</div>
            </div>
        );

    } else {

        return (
            <div className="nav_menu_right">
                <div onClick={case_1}>Login1</div>
                <div onClick={case_2}>Login2</div>
            </div>
        );
    };
}
export default RightMenu;

//     const kakaoLoginClickHandler = () => {
//         Kakao.Auth.login({
//             success: function (authObj) {
//                 fetch(`${"http://localhost:8080/auth/kakao/callback?accessToken="+authObj.access_token}`, {
//                     method: "GET",
//                 })

//                 .then(res => res.json())
//                 .then(res => {
//                     localStorage.setItem("token", res.token);
//                     if (res.access_token) {
//                         alert("welcome")
//                         history.push("/");
//                     }
//                 })
//             },
//             fail: function (err) {
//                 alert(JSON.stringify(err))
//             }
//         })
//     };

//     return (
//         <Button fill className="btn kakao" onClick={kakaoLoginClickHandler}>카카오 로그인</Button>
//     );
// };

// export default RightMenu;
