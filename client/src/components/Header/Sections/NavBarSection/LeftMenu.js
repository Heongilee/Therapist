import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function LeftMenu() {
    return (
        <div>
            <Link to="/board">Board</Link>
        </div>
    );
};

export default LeftMenu;
