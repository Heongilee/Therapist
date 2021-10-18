import React from 'react';
import { Link } from 'react-router-dom';
import './MainImg.css';


function MainImg() {

    return (
        <section>
            <Link to='/'><div className="main_img">
                <div className="main_img_wrapper">
                </div>
            </div></Link>
        </section>
    )
}

export default MainImg;
