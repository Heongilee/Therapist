import React, { useMemo } from 'react';
import { Menu } from 'antd';
import './SideBar.css';



function SideBar({ categorySelect, CATEGORY_LIST, category, CATEGORY_HANGUL_LIST }) {


    const menu = () => useMemo(() => 
            CATEGORY_LIST.map((data) => {
                return <Menu.Item key={data}>{CATEGORY_HANGUL_LIST[data]}</Menu.Item>
        }),[CATEGORY_LIST])

    return (
        <div className="sideBar">
            
            <Menu mode="vertical" selectedKeys={category} onClick={(event) => categorySelect(event.key)}>
                    <Menu.Item key='category11' style={{ borderBottom:"1px solid #e9e7e7"}, {color:'#8c8c8c'}} 
                                        disabled="false">카테고리</Menu.Item>
                    { menu() }
            </Menu>
        </div>
    );
};

export default SideBar;


