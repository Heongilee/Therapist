import React, { useState } from 'react';
import useOpenVidu from '../../hook/useOpenVidu.js';
import useRedioModal from '../../hook/useRedioModal.js';
import ModalPortal from '../../portal/ModalPortal.js';
import OpenViduLayout from './sections/OpenViduLayout.js';
import OpenViduFooter from './sections/OpenViduFooter.js';

import './OpenViduPage.css';

const first = ['성진'];
const second = ['헌기', '유라'];

function OpenViduPage() {
    //publisher, subscriber 
    const { joinSession, leaveSession, publisher, subscriber  } = useOpenVidu({nickName:localStorage.getItem('nickname')});
    
    const { ModalRedioRender, onLayoutHandler, LayoutState } = useRedioModal();

    const onByeByeClick = () => {
        leaveSession();
    };

    const [First, setFirstState] = useState(first);
    const [Second, setSecondState] = useState(second);

    const changeSpotlight = name => {
        console.log("name", name)
        setFirstState([name]    );

        setSecondState([...Second.filter(data => data !== name), ...First]);
    };


    return (    
        <section className="webrtc">

            <div className="webcard_content">
                <OpenViduLayout LayoutState={LayoutState}
                                publisher={First}
                                subscriber={Second}
                                changeSpotlight={changeSpotlight}
                                changeSpotlight={changeSpotlight}
                                >
                </OpenViduLayout>
            </div>
            
            <OpenViduFooter onLayoutHandler={onLayoutHandler}></OpenViduFooter>

            <ModalPortal>
                { ModalRedioRender() }
            </ModalPortal>
            
        </section>
    );
};

export default OpenViduPage;


// import React, { useState, useEffect } from 'react';
// import { Row, Col, Button, Avatar } from 'antd';
// import useOpenVidu from '../../hook/useOpenVidu.js';
// import WebCard from './sections/WebCard.js';
// import { UserOutlined } from '@ant-design/icons';
// import './WebRtcPage.css';

// const spanState = {
//     1:[24],
//     2:[12,12],
//     3:[24,12,12],
//     4:[12,12,12,12],
//     5:[8,8,8,12,12],
//     6:[8,8,8,8,8,8]
// }


// function WebRtcPage() {

//     const { joinSession, leaveSession, publisher, subscriber } = useOpenVidu({nickName:localStorage.getItem('nickname')});
    
//     const [cnt, setcnt] = useState(1);

//     const onClick = () => {
//         setcnt(cnt => cnt + 1)
//     };

//     const onByeByeClick = () => {
//         leaveSession();
//     };
    
//     // 임시
//     // useEffect(() => {
//     //     console.log("조인");
//     //     joinSession();
//     // }, [])

//     const [SpanState, setSpanState] = useState([]);


//     return (
//         <section className="webrtc">
//                 <div className="webcard_area">
                    

//                 {/* <Col>
//                     <Row span={12}><Avatar size={150} icon={<UserOutlined />} /></Row>
//                     <Row span={12}><Avatar size={150} icon={<UserOutlined />} /></Row>
//                     <Row span={24}><Avatar size={150} icon={<UserOutlined />} /></Row>
//                     </Col> */}

//                     <Row className="webcard_row" >
//                         <WebCard span={24}></WebCard>


//                         {/* {spanState[cnt].map((value, index) => {
//                             return <WebCard key={'WebCard' + index} 
//                                     span={value}
//                                     publisher={publisher}
//                                     ></WebCard>
//                         })} */}
                    
//                     </Row>    
//                 </div>
                
//             <Button onClick={onClick}>버어튼</Button>
//             <Button onClick={onByeByeClick}>나가기</Button>
//         </section>
//     );
// };

                        


{/* <Row className="openvidu_row_publisher" >
{spanState[cnt].map((data,index) => {
    return<Col span={data} className="openvidu_col_publisher">
    <div className="openvidu_publisher">
        <Avatar size={150} icon={<UserOutlined />} />
    </div>
    </Col>
})}                      
</Row>     */}


{/* Outher */}
                    {/* <Col className="openvidu_col_subscriber" >
                        <Row className="openvidu_row_subscriber">
                            <div className="openvidu_subscriber">
                                <Avatar size={100} icon={<UserOutlined />} />
                            </div>
                            <div className="openvidu_subscriber">
                                <Avatar size={100} icon={<UserOutlined />} />
                            </div>
                            <div className="openvidu_subscriber">
                                <Avatar size={100} icon={<UserOutlined />} />
                            </div>
                            <div className="openvidu_subscriber">
                                <Avatar size={100} icon={<UserOutlined />} />
                            </div>
                            <div className="openvidu_subscriber">
                                <Avatar size={100} icon={<UserOutlined />} />
                            </div>
                        </Row>                        
                    </Col>     */}