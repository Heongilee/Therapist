import { useState } from 'react';
import { Auth } from '../config/confing.js';
import { useHistory } from 'react-router-dom';
import { socket_actions } from '../_actions/socket_actions';
import { useDispatch } from 'react-redux';


const { Kakao } = window;


function useKakao() {
    const dispatch = useDispatch();
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
                            // dispatch(socket_actions.connectChannel());
                        }
                    })
                },
                
                fail: function (err) {
                    alert(JSON.stringify(err));
                    
                }
            })
        };
    
    const kakaoLogoutClickHandler = () => {
        Kakao.Auth.logout(function() {
            alert("bye bye");
            setLoginState(!LoginState);
            localStorage.clear(); 

        });

        // Kakao.API.request({
        //     //로그아웃하고
        //     url: '/v1/user/unlink',
        //     success: function (response) {
        //         alert("bye bye")

        //         Kakao.Auth.setAccessToken(undefined)
        //         setLoginState(!LoginState);
        //         localStorage.clear(); 
        //         history.push('/');
        //     },
        //     fail: function (error) {
        //     localStorage.clear(); 
        //     console.log("kakaoLogout", error)
        //     },
        //   })
   
    
    };

    return { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState:LoginState };
};

export default useKakao;