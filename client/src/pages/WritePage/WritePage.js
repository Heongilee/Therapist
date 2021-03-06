import React, { useState, useRef } from 'react';
import ModernButton from '../../components/Atoms/ModernButton/ModernButton.js';
import InputField from '../../components/Atoms/InputField/InputField.js';
import SelectBar from '../../components/SelectBar/SelectBar.js';
import useGetWriteInfo from '../../hook/useGetWriteInfo.js';
import { WRITE_TITLE } from '../../constants/writePageConstants.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { requestApi }  from './helper/requestApi';
import { useHistory } from 'react-router-dom';
import { socket_actions } from '../../_actions/socket_actions.js';
import { useDispatch } from 'react-redux';

import './WritePage.css';


function WritePage({ location }){

    const dispatch = useDispatch();

    const { data, key } = location;
    const history = useHistory();

    const WritePageState = useGetWriteInfo(key, data);
    const { userId, replyId, postId, title, content, type, postType, userName} = WritePageState;
    
    const [CateGoryState, setCateGoryState] = useState(null);
        
    const editorRef = useRef(null); 
    const titleRef = useRef(null);

    const handleButtonClick = async() => {

        const title = titleRef.current;
        const content = editorRef.current.getInstance().getMarkdown();
        // const content = editorRef.current.getInstance().getHTML();
    
        
        if (title){
            if (title.state.value === null || title.state.value.length < 3){
                alert("제목을 3글자이상 적어주세요");
                return;
            }
        }

        if (content.length < 3){
            alert("내용을 3글자 이상 적어주세요");
            return;
        }

        if (type === 'writeQuestion' &&  CateGoryState === null){
            alert("카테고리를 선택해주세요");
            return;
        }

        const response = await requestApi({ 
            userId:userId, replyId:replyId, postId:postId, 
            title: title && title.state.value, content:content, type, 
            postType: CateGoryState || postType, history:history
         });
        
         if (response){
            
            if (type === 'writeAnswer'){ 
                const message = {
                    type:"message",
                    senderUserName: localStorage.getItem('username'),
                    postType: "reply",
                    receivedUserName: userName
                }
                dispatch(socket_actions.sendMessage(message));
            }

            const url = postId ? `/posts/${postId}` : '/board';
            history.push(url);
         }

    };


    const onChange = (value) => {
        setCateGoryState(value)
    };
    const toolbarItems = [['italic', 'bold']];

  return (
      <section className="writepage">
        <div className="wrapper">
            <div className="writepage_area">
                <div className="writepage_title_area">    
                    <div className="writepage_title_header">
                        <h1>{localStorage.getItem('username')}{WRITE_TITLE[type]}</h1>
                        <div>
                            { type === 'writeQuestion' ? <SelectBar onChange={onChange}>
                                                        </SelectBar> : null}
                            <ModernButton ButtonName={"글등록"}
                                        handleButtonClick={handleButtonClick}
                            ></ModernButton>
                        </div>
                    </div>
                <div className="title_content"> 
                    { type === 'writeQuestion' || type === 'questionModify' ? 
                    <InputField placeHolder="제목을 입력해 주세요"
                    infoRef={titleRef}
                    defaultValue={title}></InputField> 
                    : null }

                    <Editor
                        previewStyle="vertical"
                        height="600px"
                        initialValue={content}
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        ref={editorRef}
                        toolbarItems={toolbarItems}
                        language="ko"
                    />
                    </div> 
                </div>
            </div>
        </div>
    </section>
  );
};

export default WritePage;