import React from 'react';
import { Select } from 'antd';
import { CATEGORY } from '../../constants/writePageConstants.js';

const { Option } = Select;

function SelectBar({ onChange }) {


    return (
        <>
            <Select placeholder="게시판 선택" onChange={onChange}style={{ width: 120, marginRight:"10px"}} >
                { CATEGORY.map(( category, index ) => (
                    <Option key={ category } value={ category }> { category }</Option>
                    )) }
            </Select>
        </>
       
    )
};

export default SelectBar;

