import React from 'react';
import useCheckBox from '../../hook/useCheckBox.js';
import useCheckBoxModal from '../../hook/useCheckBoxModal.js';
import ModalForm from '../Modal/ModalForm.js';
import { Checkbox } from 'antd';
import './MyPageForm.css';


function MyPageForm({ postData, cateGory }) {
    
    console.log("mypage");

    const [ CheckState, checkBoxhandler ] = useCheckBox({ postData });
    const { showDeleteModal, handleOk, handleCancel, visible, confirmLoading } = useCheckBoxModal({ CheckState });

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
                    <ModalForm modalText={"선택한 내용들을 삭제하시겠습니까?"}
                                showDeleteModals={ showDeleteModal} handleOk={ handleOk } handleCancel={ handleCancel } 
                                visible= { visible } confirmLoading={ confirmLoading }
                            />
                    </div>
                </div>
        );
};

export default React.memo(MyPageForm);


