import React, { useState, useRef, useEffect } from 'react';
import GridCard from './GridCard.js';
import SideBarCard from './SideBarCard.js';
import { Row, Col } from 'antd';

import './SideBarLayout.css';


function SideBarLayout({ publisher, subscriber,spotlight, setSpotlight,currentSpotLight }) {
    
    // const [Spotlight, setSpotlight] = useState(undefined);

    
    const changeSpotlight = (streamManager, index) => {
        currentSpotLight.current = index;
        setSpotlight(streamManager);
    };

    return (
        <>
            <Row className="openvidu_grid_row" >
                <Col span={24} className="openvidu_grid_col">
                    { <GridCard 
                                            streamManager={spotlight}
                                            cardHeight={'700px'}
                                            ></GridCard>}
                </Col>   
            </Row>
            
            {/* subscriber */}
            <Col className="openvidu_sidebar_col" >
                <Row className="openvidu_sidebar_row">
                    <SideBarCard
                                index={0}
                                streamManager={publisher}
                                changeSpotlight={changeSpotlight}
                                setSpotlight={setSpotlight}
                                >
                                </SideBarCard>

                    { subscriber.length >=1 && subscriber.map((data, index) => {
                        return <SideBarCard 
                                key={'sidebarcard'+index}
                                index={index + 1}
                                streamManager={data}
                                changeSpotlight={changeSpotlight}
                                setSpotlight={setSpotlight}
                                ></SideBarCard>
                    })}

                </Row>   
            </Col> 
        </>
    );
};

export default SideBarLayout;
