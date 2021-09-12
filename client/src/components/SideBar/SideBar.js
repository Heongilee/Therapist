import React, { useMemo } from 'react';
import { Menu } from 'antd';
import './SideBar.css';

function SideBar({ categorySelect, CATEGORY_LIST, category }) {


    const menu = () => useMemo(() => 
            CATEGORY_LIST.map((data) => {
                return <Menu.Item key={data}>{data}</Menu.Item>
        }),[CATEGORY_LIST])

    return (
        <div className="sideBar">
            
            <Menu mode="vertical" selectedKeys={category} onClick={(event) => categorySelect(event.key)}>
                    <Menu.Item key='category11' style={{ borderBottom:"1px solid #e9e7e7"}, {color:'#8c8c8c'}} 
                                        disabled="false">Category List</Menu.Item>
                    { menu() }
            </Menu>
        </div>
    );
};

export default SideBar;


