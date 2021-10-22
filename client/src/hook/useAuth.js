 
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { auth } from '../_actions/user_actions';
// import axios from 'axios';



// export default function(SpecificComponent, option) {

//     const AuthenticationCheck = (props) => {

//         const dispatch = useDispatch();
//         const user = useSelector(state => state.user);

//         useEffect(() => {

//             dispatch(auth()).then(response => {
//                 console.log("auth", response);
                
//                 //로그인 하지 않은 상태
//                 if(!response.payload.isAuth) {
                    
//                 } else { //로그인 상태
                    
//                 }

//             });

//         }, []);

//         return (<SpecificComponent { ...props } user={ user }/>)

//     };

//     return AuthenticationCheck;
// };