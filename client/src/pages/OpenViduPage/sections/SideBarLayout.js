import React from 'react';
import GridCard from './GridCard.js';
import SideBarCard from './SideBarCard.js';
import { useContextOpv } from '../../../hook/useContextOpv.js';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined, PushpinFilled, 
    PushpinOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

import './SideBarLayout.css';

const temp = [1,2];

function SideBarLayout({ publisher, subscriber, changeSpotlight }) {
    

    return (
        <>
            <Row className="openvidu_grid_row" >
                <Col span={24} className="openvidu_grid_col">
                    { publisher && <GridCard 
                                            streamManager={publisher}
                                            cardHeight={'700px'}
                                            ></GridCard>}
                </Col>   
            </Row>
            
            {/* subscriber */}
            <Col className="openvidu_sidebar_col" >
                <Row className="openvidu_sidebar_row">
                    { subscriber && subscriber.map((data, index) => {
                        return <SideBarCard 
                                key={'sidebarcard'+index}
                                streamManager={subscriber}
                                changeSpotlight={changeSpotlight}
                                ></SideBarCard>
                    })}

                </Row>   
            </Col> 
        </>
    );
};

export default SideBarLayout;
