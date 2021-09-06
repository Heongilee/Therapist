import { useState } from 'react';
import { Auth } from '../config/confing.js';

const { Kakao } = window;


function useKakao() {

    const [LoginState, setLoginState] = useState(localStorage.getItem('token') ? true : false);

    const kakaoLoginClickHandler = () => {
        Kakao.Auth.login({
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

        Kakao.API.request({
            //로그아웃하고
            url: '/v1/user/unlink',
            success: function (response) {
                alert("bye bye")
                Kakao.Auth.setAccessToken(undefined)
                setLoginState(!LoginState);
                localStorage.clear(); 
            },
            fail: function (error) {
              console.log(error)
            },
          })
   
    
    };

    return { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState:LoginState };
};

export default useKakao;
