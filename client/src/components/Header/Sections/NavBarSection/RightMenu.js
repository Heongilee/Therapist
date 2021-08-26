import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ModalPortal from '../../../../portal/ModalPortal.js';
import { useHistory } from "react-router-dom";

import './RightMenu.css';

const { kakao } = window;

function RightMenu() {
    
    const history = useHistory();

    const temp = 2;



    const onClick = () => {
        Kakao.Auth.login({
            success: function(response) {
              console.log(response);
            },
            fail: function(error) {
              console.log(error);
            },
          });
    };

    if (temp === 1){

        return (
            <div className="nav_menu_right">
                <Link to='/mypage'><div style={{marginRight:'1rem'}}>MyPage</div></Link>
                <div>Logout</div>
            </div>
        );

    } else {

        return (
            <div className="nav_menu_right" onClick={onClick}>
                Login
            </div>
        );
    };
    
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