import React, { useState, useEffect } from 'react';

// 1번 내아이디 쓰기
// 2번 내아이디 쓰기
// 3번 제목 내용 내아이디 고유아이디
// 4번 내용 내아이디 고유아이디

//key , 초기
function useGetWriteInfo(key, initialState={}) {
    
    const [ WritePageState, setWritePageState ] = useState(
        () => JSON.parse(window.localStorage.getItem(key)) || initialState
    );

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(WritePageState));
    }, []);

    return WritePageState;
}


export default useGetWriteInfo;
