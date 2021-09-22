 
import React, { useState } from "react";
import useKakao from '../../../../hook/useKakao.js';
import usePushMessage from '../../../../hook/usePushMessage.js';

import { Link } from 'react-router-dom';
import { Popover, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

import PopOverContent from '../../../PopOverContent/PopOverContent.js';


import './RightMenu.css';


function RightMenu() {
    
    const { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState } = useKakao();

    const { count, noticeHendler } = usePushMessage();

    const [state, setstate] = useState(false);

    const onVisibleChange = visible => {
        if (visible) {
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;    

        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
        setstate(!state);
    };

    return (
        <>
            { LoginState ? 
                <div className="nav_menu_right">
                    <Popover placement="bottomRight" key={"popover"} 
                    title={"알림"} content={<PopOverContent/>} 
                    onVisibleChange={onVisibleChange}
                    visible={state}
                    trigger="click">
                    
                        <Badge count={count}  style={{marginRight:'0.9rem'}}>
                        <BellOutlined   
                        style={{fontSize:'1.8rem', marginRight:'0.9rem'}}/>
                        </Badge>

                    </Popover>

                    <Link to='/mypage'>
                        <div style={{marginRight:'0.9rem'}}>MyPage</div>
                    </Link>

                    <div onClick={ kakaoLogoutClickHandler }>Logout</div> 
                </div> 
                
                : 
                
                <div className="nav_menu_right">
                    <div onClick={ kakaoLoginClickHandler }>Login</div>
                </div> 
            }           
        </>
    );
};

export default RightMenu;
