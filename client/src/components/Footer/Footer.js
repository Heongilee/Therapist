import React from 'react';
import './Footer.css';


function Footer() {
    return (
        <section className="footer_section">
                <footer className="footer">
                    <div className="wrapper">
                        <div className="content">
                            <div>평온을 선사해드릴께요. 마음의 평안을 위해... by Soraka</div>
                            <div style={{color:'#777', marginTop:'10px'}}> Git: https://github.com/Heongilee/projectTeam</div>
                            <div style={{color:'#777'}}> Copyright © Therpist All rights reserved.. </div>
                        </div>
                    </div>
                </footer>
        </section>
    )
};

export default Footer;
