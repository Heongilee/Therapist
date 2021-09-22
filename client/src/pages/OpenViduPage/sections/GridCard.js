import React, { useState } from 'react';
import { Row, Col,Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import OpenViduVideo from './OpenViduVideo.js';

import './GridCard.css';

function GridCard({ span, publisher, onClick=null, nickName=null }) {
    
    return (
        <div className="grid_card" onClick={onClick}>
            <Avatar size={150} icon={<UserOutlined />} />
            <div className="grid_nickname">{nickName}</div>
        </div>
    );
};

export default GridCard;



// import React, { useState } from 'react';
// import { Row, Col,Button, Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import OpenViduVideo from './OpenViduVideo.js';

// import './WebCard.css';

// function OpenViduCard({ span, publisher }) {

//     return (
//         <Col span={ span } className="webcard_col">
//                 <div className="webrtc_card">
//                     {/* <OpenViduVideo streamManager={publisher}></OpenViduVideo> */}
//                     <Avatar size={150} icon={<UserOutlined />} />
//                 </div>
//         </Col>
//     );
// };

// export default OpenViduCard;
