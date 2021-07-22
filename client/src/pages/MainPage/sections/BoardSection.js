import React from 'react';
import './css/boardSection.css';
import { Pagination } from 'antd';
// boardSection
function BoardSection({ boardData }) {


    const leftSection = boardData.slice(0,3).map(( data, index )=> {

        return <li className="board" key={ index }> </li>
    });

    const rightSection = boardData.slice(3,6).map(( data, index )=> {

        return <li className="board" key={ index }> </li>
    });


    return (
        <div className="board_section">
            <div className ="wrapper">
                <div className ="board_container">
                    <div className="board_header_area">
                        <div className="board_header">많이 본 Q&A</div>
                    </div>
                    
                    <div className="board_area">
                        <ul className="board_list">
                            { leftSection }
                        </ul>
                        <ul className="board_list">
                            { rightSection }
                        </ul>
                    </div>
                    <div className="pagination"> <Pagination/> </div>
                </div>
            </div>
        </div>
    )
};

export default BoardSection;
