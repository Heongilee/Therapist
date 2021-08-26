import React from 'react';
import NavBar from './Sections/NavBar.js';
import './Header.css';


function Header() {
    return (
        <header>
            <div className="wrapper">
                <NavBar></NavBar>
            </div>
        </header>
    )
};

export default Header;
