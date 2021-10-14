 
import React, { useState } from "react";
import useKakao from '../../../../hook/useKakao.js';
import usePushMessage from '../../../../hook/usePushMessage.js';
import usePopOver from '../../../../hook/usePopOver.js';
import { Link } from 'react-router-dom';
import { Popover, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

import PopOverContent from '../../../PopOverContent/PopOverContent.js';


import './RightMenu.css';


function RightMenu() {
    
    const { kakaoLoginClickHandler, kakaoLogoutClickHandler, LoginState } = useKakao();

    const { count } = usePushMessage();

    const { PopOverState, setPopOverState, onVisibleChange } = usePopOver();

    return (
        <>
            { LoginState ? 
                <div className="nav_menu_right">
                    <Popover placement="bottomRight" key={"popover"} 
                    title={"알림"} content={<PopOverContent setPopOverState={setPopOverState}/>} 
                    onVisibleChange={onVisibleChange}
                    visible={PopOverState}
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
