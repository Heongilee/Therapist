import React from 'react';
import SelectButton from './sections/SelectButton.js';
import ModernButton from '../../components/atoms/ModernButton/ModernButton.js'
import TextField from '../../components/atoms/TextField/TextField.js'
import InputField from '../../components/atoms/InputField/InputField.js'
import './WritePage.css';

function WritePage() {
    return (
        <section className="writePage">
            <div className="wrapper">
                <div className="writePage_area">
                    <div className="writePage_header">
                        <SelectButton></SelectButton>
                        <InputField placeHolder={"제목을 입력하세요."}></InputField>
                        <TextField></TextField>        
                    </div>
                    <div className="writePage_footer">
                        <ModernButton ButtonName={ "등록" }></ModernButton>
                        <ModernButton ButtonName={ "취소" }></ModernButton>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default WritePage;
