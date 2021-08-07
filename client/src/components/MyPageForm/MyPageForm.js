import React from 'react';
import { Checkbox } from 'antd';
import useCheckBox from '../../hook/useCheckBox.js'
import ModernButton from '../atoms/ModernButton/ModernButton.js';
import './MyPageForm.css';


function MyPageForm({ postData, cateGory }) {

    const { CheckState, checkBoxhandler, handleButtonClick} = useCheckBox({postData});

    const postList = postData.map((data, index) => {
        return <li className="post_area" key={ "data" + index }>
                        <Checkbox dataSet={index} checked={CheckState[index]} 
                                        onChange={(event)=>checkBoxhandler(event)}></Checkbox>
                        <div className="post">
                            <div className="post_header">
                                <div>{data[cateGory[0]]}</div>   
                                <div>{data[cateGory[1]]}</div>
                            </div>
                        </div>
                </li>
        });
        
        return (
                <div className="posts">
                    <div className="posts_header">
                        <div className="category_name">카테고리 이름</div>
                    </div>
                    <ul className="posts_list">
                        { postList }
                    </ul>
                    <div className="posts_footer">
                        <ModernButton ButtonName={"삭제"} handleButtonClick={handleButtonClick}></ModernButton>
                    </div>
                </div>
        );
};

export default MyPageForm;


