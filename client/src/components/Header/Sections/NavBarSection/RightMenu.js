 
import React from 'react';
import useKakao from '../../../../hook/useKakao.js';
import usePushMessage from '../../../../hook/usePushMessage.js';
import { Link } from 'react-router-dom';

import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';


import './RightMenu.css';


function RightMenu() {
    
    const { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState } = useKakao();

    const { count, noticeHendler } = usePushMessage();

    return (
        <>
            { LoginState ? 
                <div className="nav_menu_right">

                    <Badge count={count}  style={{marginRight:'0.9rem'}}>
                        <BellOutlined onClick={noticeHendler} style={{fontSize:'1.8rem', marginRight:'0.9rem'}}/>
                    </Badge>

                    <Link to='/mypage'>
                        <div style={{marginRight:'0.9rem'}}>MyPage</div>
                    </Link>

                    <div onClick={ kakaoLogoutClickHandler }>Logout</div> 
                </div> : 
                <div className="nav_menu_right">
                    <div onClick={ kakaoLoginClickHandler }>Login</div>
                </div> }           
        </>
    );
};

export default RightMenu;
