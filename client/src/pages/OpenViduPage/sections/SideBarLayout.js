import React from 'react';
import GridCard from './GridCard.js';
import SideBarCard from './SideBarCard.js';
import { useContextOpv } from '../../../hook/useContextOpv.js';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined, PushpinFilled, 
    PushpinOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

import './SideBarLayout.css';

const temp = [1,2];

function SideBarLayout() {
    
    const { publisher, subscriber, changeSpotlight } = useContextOpv();
        
    
    const onClick = name => {
        changeSpotlight(name);
    };

    return (
        <>
            <Row className="openvidu_grid_row" >
                <Col span={24} className="openvidu_grid_col">
                    <Avatar size={90} icon={<UserOutlined />} />
                    {/* { publisher && <GridCard streamManager={publisher}></GridCard>} */}
                </Col>   
                    
              
            </Row>
          
            {/* subscriber */}
            <Col className="openvidu_sidebar_col" >
                <Row className="openvidu_sidebar_row">
                    { temp.map((data, index) => {
                        return <SideBarCard 
                                key={'sidebarcard'+index}
                                streamManager={publisher}
                                onClick={onClick}
                                nickName={data}></SideBarCard>;
                    })}

                </Row>   
            </Col> 
        </>
    );
};

export default SideBarLayout;
