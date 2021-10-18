import React from 'react'
import LeftMenu from './NavBarSection/LeftMenu.js';
import RightMenu from './NavBarSection/RightMenu.js';
import './NavBar.css';


function NavBar() {

    
    return (
        <nav>
            <div className="nav_logo">
                <a href="/">Home</a>
            </div>
            
            <div className="nav_menu">
                <LeftMenu></LeftMenu>
                <RightMenu></RightMenu>
            </div>
            
        </nav>
    )
}

export default NavBar;
