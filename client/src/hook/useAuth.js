 
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import axios from 'axios';


//option 
//null  => 아무나 출입이 가능
//true  => 로그인한 유저만 출입 가능 페이지
//false => 로그인한 유저는 출입 불가능한 페이지

/*
    {
        "username" : <String>,
        "password" : <String>
    }
*/

export default function(SpecificComponent, option) {

    const AuthenticationCheck = (props) => {

        const dispatch = useDispatch();
        const user = useSelector(state => state.user);

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log("auth", response);
                
                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    
                } else { //로그인 상태
                    
                }

            });

        }, []);

        return (<SpecificComponent { ...props } user={ user }/>)

    };

    return AuthenticationCheck;
};