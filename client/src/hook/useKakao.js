import { useState, useEffect } from 'react';
import { Auth } from '../config/config.js';
import { useHistory } from 'react-router-dom';
import { socket_actions } from '../_actions/socket_actions';
import { useDispatch } from 'react-redux';



const { Kakao } = window;
const REACT_APP_KAKAO_LOGIN_APP_KEY = process.env.REACT_APP_KAKAO_LOGIN_APP_KEY;

function useKakao() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [LoginState, setLoginState] = useState(sessionStorage.getItem('token') ? true : false);
    
    useEffect(() => {
        if (LoginState){
            dispatch(socket_actions.connectChannel());
        }
    }, [LoginState]);


    const kakaoLoginClickHandler = () => {
        Kakao.init(REACT_APP_KAKAO_LOGIN_APP_KEY);
        Kakao.Auth.login({
            scope: 'profile_nickname, account_email',
            success: function (authObj) {
                fetch(`${Auth + "/api/auth/kakao/callback?accessToken="+authObj.access_token}`, {
                        method: "GET",
                    })
                    .then(res => res.json())
                    .then(res => {

                        sessionStorage.setItem("token", res.token);
                        localStorage.setItem("username", res.username);
                        if (res.token) {
                            alert("welcome")
                            setLoginState(!LoginState);
                            dispatch(socket_actions.setNoticeCount(res.totalNotices));
                            dispatch(socket_actions.connectChannel());
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
            alert("bye bye")
            localStorage.clear();
            sessionStorage.clear();
            setLoginState(!LoginState);
            dispatch(socket_actions.disConnectChannel());
            history.push(`/`);
        });
    };

    return { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState:LoginState };
};

export default useKakao;