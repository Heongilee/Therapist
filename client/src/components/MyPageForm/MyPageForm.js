import React from 'react';
import useCheckBox from '../../hook/useCheckBox.js';
import useCheckBoxModal from '../../hook/useCheckBoxModal.js';
import ModalForm from '../Modal/ModalForm.js';
import ModernButton from '../Atoms/ModernButton/ModernButton.js';
import { Checkbox } from 'antd';
import './MyPageForm.css';


function MyPageForm({ postData, cateGory, postType }) {
    

    const [ CheckState, checkBoxhandler ] = useCheckBox({ postData });
    const { showDeleteModal, handleOk, handleCancel, visible, confirmLoading } 
    = useCheckBoxModal({ CheckState, postData, postType:postType });

    const postList = postData.map((data, index) => {
        return <li className="mypage_post_area" key={ "data" + index }>
                        <Checkbox dataSet={index} checked={CheckState[index]} 
                                        onChange={(event)=>checkBoxhandler(event)}></Checkbox>
                        <div className="mypage_post">
                            <div className="mypage_post_header">
                                <div>{data[cateGory[0]]}</div>   
                                <div>{data[cateGory[1]]}</div>
                                <div>{data[cateGory[2]]}</div>
                            </div>
                        </div>
                </li>
        });
        
        return (
                <div className="mypage_posts">
                    <div className="mypage_posts_header">
                        <div className="mypage_category_name">카테고리 이름</div>
                    </div>

                    <ul className="mypage_posts_list">
                        { postList }
                    </ul>

                    <div className="mypage_posts_footer">
                    
                        <div className='post_delete_btn' >
                                    <ModernButton ButtonName={"삭제"}
                                        handleButtonClick={ showDeleteModal }>
                                    </ModernButton>  
                        </div>
                    </div>
                    
                    <ModalForm modalText={"선택한 내용들을 삭제하시겠습니까?"}
                                handleOk={ handleOk } handleCancel={ handleCancel } 
                                visible= { visible } confirmLoading={ confirmLoading }
                            />
                </div>
        );
};

export default React.memo(MyPageForm);


