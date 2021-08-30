import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ModalPortal from '../../../../portal/ModalPortal.js';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { user_actions } from '../../../../_actions/user_actions';
import { Button } from 'antd';

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
//             } const case_1 = () => {

//     const info = {
//         method:'get',
//         url:LOGIN_API,
//         data :{
//         name: "invanda",
//         password: "code101"}
//     }

//     dispatch(user_actions.fetchLogin(info))
// };

// const case_2 = () => {

// };

//         })
//     };

//     return (
//         <Button fill className="btn kakao" onClick={kakaoLoginClickHandler}>카카오 로그인</Button>
//     );
// };

// export default RightMenu;




// import React, { useState } from 'react';
// import { withRouter, Link } from 'react-router-dom';
// import ModalPortal from '../../../../portal/ModalPortal.js';
// import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { user_actions } from '../../../../_actions/user_actions';

// import './RightMenu.css';

// const { kakao } = window;

// function RightMenu() {
    
//     const dispatch =  useDispatch();
//     const history = useHistory();
//     const temp = 2;

//     const LOGIN_API = "/auth/kakao/callback?accessToken=";
    
//     const kakaoLoginClickHandler = () => {
        
//         Kakao.Auth.login({
//             success: function (authObj) {
//                 console.log("authObj.access_token", authObj.access_token)
//                 const info = {
//                     method:'GET',
//                     url:LOGIN_API + authObj.access_token,
//                 }

//                 dispatch(user_actions.fetchLogin(info))
               
//             },
            
//             fail: function (err) {
//                 alert(JSON.stringify(err))
//             }
//         })
//     };


//     if (temp === 1){

//         return (
//             <div className="nav_menu_right">
//                 <Link to='/mypage'><div style={{marginRight:'1rem'}}>MyPage</div></Link>
//                 <div>Logout</div>
//             </div>
//         );

//     } else {

//         return (
//             <div className="nav_menu_right">
//                 <div onClick={kakaoLoginClickHandler}>Login1</div>
//                 {/* <div onClick={case_2}>Login2</div> */}
//             </div>
//         );
//     };
// }
// export default RightMenu;