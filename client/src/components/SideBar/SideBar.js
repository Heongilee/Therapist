import React, {useState} from 'react';
import { Menu } from 'antd';
import './SideBar.css';

function SideBar({ categorySelect, categoryList, category }) {

    console.log("나도궁금")
    return (
        <div className="sideBar">
            
            <Menu mode="vertical" selectedKeys={category} onClick={(event) => categorySelect(event.key)}>
                    <Menu.Item key='category11' style={{ borderBottom:"1px solid #e9e7e7"}, {color:'#8c8c8c'}} 
                                        disabled="false">Category List</Menu.Item>
                    {categoryList.map((data, index) => {
                        return <Menu.Item key={data}>{data}</Menu.Item>
                   })}

            </Menu>
        </div>
    );
};

export default SideBar;


