import React, { useEffect, useCallback } from 'react';


function useKakao() {

    useEffect(() => {
       
    }, []);
    
    const checkToken = useCallback(
        () => {
            localStorage.getItem('token')
        },
    []);

    const kakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                fetch(`${"http://localhost:8080/auth/kakao/callback?accessToken="+authObj.access_token}`, {
                        method: "GET",
                    })
                    .then(res => res.json())
                    .then(res => {
                        localStorage.setItem("token", res.token);
                        console.log("res.access_token", res.access_token)
                        if (res.access_token) {
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

    return { kakaoLoginClickHandler };
};

export default useKakao;
