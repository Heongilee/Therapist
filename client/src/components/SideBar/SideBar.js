import React from 'react';
import { Menu } from 'antd';
import './SideBar.css';

function SideBar({ categorySelect, list }) {

    return (
        <div className="sideBar">
            
            <Menu mode="vertical" defaultSelectedKeys={['1']} onClick={(event) => categorySelect(event.key)}>
                    <Menu.Item key='0' style={{ borderBottom:"1px solid #e9e7e7"}, {color:'#8c8c8c'}} 
                                        disabled="false">Category List</Menu.Item>
                    {list.map((data, index) => {
                        return <Menu.Item key={index + 1}>{data}</Menu.Item>
                   })}

            </Menu>
        </div>
    );
};

export default SideBar;
