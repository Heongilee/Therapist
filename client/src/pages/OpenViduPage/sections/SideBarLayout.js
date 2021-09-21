import React from 'react';
import GridCard from './GridCard.js';
import SideBarCard from './SideBarCard.js';
import { Row, Col } from 'antd';

    
import './SideBarLayout.css';


function SideBarLayout({ publisher, subscriber, changeSpotlight }) {
    
    const onClick = name => {
        changeSpotlight(name)
    };

    return (
        <>
            <Row className="openvidu_grid_row" >
                <Col span={24} className="openvidu_grid_col">
                    <GridCard nickName={publisher[0]}></GridCard>
                </Col>       
            </Row>

            <Col className="openvidu_sidebar_col" >
                <Row className="openvidu_sidebar_row">
                    {subscriber.map((data, index) => {
                        return <SideBarCard 
                                key={'sidebarcard'+index}
                                onClick={onClick}
                                nickName={data}></SideBarCard>;
                    })}

                </Row>
                       
            </Col>    
        </>
    );
};

export default SideBarLayout;
