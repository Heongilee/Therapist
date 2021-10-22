import { useState } from 'react';
import { Auth } from '../config/confing.js';
import { useHistory } from "react-router-dom";

const { Kakao } = window;


function useKakao() {

    const [LoginState, setLoginState] = useState(localStorage.getItem('token') ? true : false);

    const kakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            scope: 'profile_nickname, account_email',
            success: function (authObj) {
                fetch(`${Auth + "/auth/kakao/callback?accessToken="+authObj.access_token}`, {
                        method: "GET",
                    })
                    .then(res => res.json())
                    .then(res => {
                        localStorage.setItem("token", res.token);
                        localStorage.setItem("username", res.username);
                        if (res.token) {
                            alert("welcome")
                            setLoginState(!LoginState);
                        }
                    })
                },

                fail: function (err) {
                    alert(JSON.stringify(err))
                }
            })
        };

    const kakaoLogoutClickHandler = () => {
        Kakao.Auth.logout(function() {
            alert("bye bye")
            localStorage.clear();
            setLoginState(!LoginState);
            history.push(`/`);
        });
    };

    return { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState:LoginState };
};

export default useKakao;
