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
                <Option value="category1">category 1</Option>
                <Option value="category2">category 2</Option>
                <Option value="category3">category 3</Option>
                <Option value="category4">category 4</Option>
            </Select>
        </div>
    );
};

export default SelectButton;
