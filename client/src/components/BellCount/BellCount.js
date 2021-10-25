import React from 'react'
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import usePushMessage from '../../hook/usePushMessage.js';
import useQuery from '../../hook/useQuery.js';


function BellCount() {

    const { count } = usePushMessage();
    const endpoint = `/notice/total/${localStorage.getItem('username')}`
    const temp = useQuery(endpoint);
    console.log("temp", count, temp)

    return (
        <Badge count={count + temp ? temp : 0}  style={{marginRight:'0.9rem'}}>       
        </Badge>
    );
};

export default BellCount;
