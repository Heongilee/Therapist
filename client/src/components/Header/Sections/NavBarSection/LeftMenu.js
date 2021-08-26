import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './LeftMenu.css';

function LeftMenu() {
    return (
        <div className="nav_menu_left">
            <Link to="/board">Board</Link>
        </div>
    );
};

export default LeftMenu;
