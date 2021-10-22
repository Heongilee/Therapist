import React from 'react';
import './ErrorPage.css';


export const Page403 = () => {

    return <div className="error_title">403 Error: Forbidden </div>
};

export const Page404 = () => {

    return <div className="error_title">404 Error: 페이지를 찾을 수 없습니다.</div>
};

export const Page405 = () => {

    return <div className="error_title">405 Method Not Allowed: 클라이언트의 요청이 허용되지 않는 메소드.</div>
};

export const Page500 = () => {

    return <div className="error_title">500  Server errors: 서버 에러 </div>
};