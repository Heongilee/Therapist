import React from 'react';
import './style.css';


function Footer() {
    return (
        <section className="footer_section">
                <footer className="footer">
                    <div className="wrapper">
                        <div className="content">
                            <div>평온을 선사해드릴께요. 마음의 평안을 위해... by Soraka</div>
                            <div style={{color:'#777', marginTop:'10px'}}> Git: https://github.com/Heongilee</div>
                            <div style={{color:'#777'}}> Copyright © Therpist All rights reserved.. </div>
                        </div>
                    </div>
                </footer>
        </section>
    )
};

// function Footer() {
//     return (
//         <section className="footer_section">
//                 <footer className="footer">
//                     <div className="wrapper">
//                         <div className="footer_content">
//                             <div className="footer_developer">개발자</div>     
//                             <div className="footer_git">
//                                 <div>정유라 git: https://github.com/jungyr24  </div>
//                                 <div>이헌기 git: https://github.com/Heongilee </div>
//                                 <div>변성진 git: https://github.com/seounjin  </div>
//                             </div>
//                             <div className="footer_menu">
//                                 Therapist
//                             </div>
//                         </div>
//                     </div>
//                 </footer>
//         </section>
//     )
// };

export default Footer;
