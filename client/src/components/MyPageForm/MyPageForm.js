import React from 'react';
import useCheckBox from '../../hook/useCheckBox.js';
import useCheckBoxModal from '../../hook/useCheckBoxModal.js';
import ModalForm from '../Modal/ModalForm.js';
import ModernButton from '../Atoms/ModernButton/ModernButton.js';
import ToastViewer from '../ToastViewer/ToastViewer.js';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import './MyPageForm.css';


function MyPageForm({ postData, cateGory, postType, currentPage, CATEGORY_HANGUL_LIST }) {
    
    const [ CheckState, checkBoxhandler ] = useCheckBox({ postData, currentPage });


    const { showDeleteModal, handleOk, handleCancel, visible, confirmLoading } 
    = useCheckBoxModal({ CheckState, postData, postType:postType });
    
    

    const postList = 
    postData.slice((currentPage - 1) * 6, ((currentPage - 1) * 6) + 6)
    .map((data, index) => {
        return <li className="mypage_post_area" key={ "data" + index }>
                        <Checkbox dataSet={index} checked={CheckState[index]} 
                                        onChange={(event)=>checkBoxhandler(event)}></Checkbox>
                        <div className="mypage_post">
                        
                        <Link to={`/posts/${data.postId}`}>
                            <div className="mypage_post_header">
                                
                                {postType === 'myPosts' ?
                                    <>
                                        <div>{ data.title }</div>   
                                        <ToastViewer text={data.content}/>
                                        {/* { data.content.split('<br>').map((line, index) => {
                                                return <span key={"content" + index}>{line}<br /></span>
                                            })} */}
                                    </> : 
                                    <>
                                    <ToastViewer text={data.content} className="temp"/>
                                    {/* { data.content.split('<br>').map((line, index) => {
                                            return <span key={"content" + index}>{line}<br /></span>
                                        })} */}
                                    <div>{ data.title }</div>    
                                    </>
                                }
                                
                            </div>
                        </Link>
                            <div style={{color:"#8c8c8c"}}>{data.createdAt}</div>  
                        </div>
                </li>
        });
        
        return (
                <div className="mypage_posts">
                    <div className="mypage_posts_header">
                        <div className="mypage_category_name">{CATEGORY_HANGUL_LIST[postType]}</div>
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


