import React from 'react'
import LeftMenu from './NavBarSection/LeftMenu.js';
import RightMenu from './NavBarSection/RightMenu.js';
import './NavBarSection/css/style.css';


function NavBar() {
    return (
        <nav>
            
            <div className="nav_logo">
                <div>Home</div>
            </div>
            
            <div className="nav_menu">
                <LeftMenu></LeftMenu>
                <RightMenu></RightMenu>
            </div>
            
        </nav>
    )
}

export default NavBar;
