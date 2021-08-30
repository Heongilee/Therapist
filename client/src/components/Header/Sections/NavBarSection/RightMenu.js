import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ModalPortal from '../../../../portal/ModalPortal.js';
import { useHistory } from "react-router-dom";

import './RightMenu.css';

const { kakao } = window;

function RightMenu() {
    
    const history = useHistory();
    const kakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                fetch(`${"http://localhost:8080/auth/kakao/callback?accessToken="+authObj.access_token}`, {
                    method: "GET",
                })

                .then(res => res.json())
                .then(res => {
                    localStorage.setItem("token", res.token);
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

    return (
        <Button fill className="btn kakao" onClick={kakaoLoginClickHandler}>카카오 로그인</Button>
    );
};

export default RightMenu;


// import React, { useState } from 'react';
// import { withRouter, Link } from 'react-router-dom';
// import useLoginModal from '../../../../hook/useLoginModal.js';
// import ModalPortal from '../../../../portal/ModalPortal.js';
// import { useHistory } from "react-router-dom";

// import './RightMenu.css';

// const { kakao } = window;

// function RightMenu() {
    
//     const history = useHistory();

//     const temp = 2;
//     const { renderLoginModal } = useLoginModal();
//     const [LoginModalstate, setLoginModalstate] = useState(false);


//     const onClick = () => {
//         setLoginModalstate(!LoginModalstate);
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
//                 <div onClick={onClick}>Login</div>
//                 <ModalPortal>
//                     {renderLoginModal({LoginModalstate})}
//                 </ModalPortal>
//             </div>
//         );
//     };
    
// };

// export default RightMenu;