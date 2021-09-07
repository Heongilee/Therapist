import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function SelectButton() {

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div>
            <Select placeholder="게시판 선택" style={{ width: 120 }} onChange={handleChange}>
                <Option value="category1"></Option>
                <Option value="category2"></Option>
                <Option value="category3"></Option>
            </Select>
        </div>
    );
};

export default SelectButton;
