import React from 'react';
import { Menu } from 'antd';
import './SideBar.css';

function SideBar() {

    console.log("나도궁금")
    return (
        <div className="sideBar">
            
            <Menu  mode="vertical">
                    <Menu.Item key="0" style={{ borderBottom:"1px solid #e9e7e7"}, {color:'#8c8c8c'}} 
                                                                    disabled="false">Category List</Menu.Item>
                    <Menu.Item key="1">category 1</Menu.Item>
                    <Menu.Item key="2">category 2</Menu.Item>
                    <Menu.Item key="3">category 3</Menu.Item>
                    <Menu.Item key="4">category 4</Menu.Item>
            </Menu>
        </div>
    );
};

export default SideBar;
