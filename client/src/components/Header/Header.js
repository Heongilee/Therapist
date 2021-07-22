import React from 'react';
import NavBar from './Sections/NavBar.js';
import './style.css';


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
