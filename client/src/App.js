import React, { Suspense }  from 'react';
import {Switch, Route } from "react-router-dom";
import Header from './components/Header/Header.js';
import MainImg from './components/MainImg/MainImg.js'
import Footer from './components/Footer/Footer.js'
import MainPage from './pages/MainPage/MainPage.js'
import BoardPage from './pages/BoardPage/BoardPage.js'
import WritePage from './pages/WritePage/WritePage.js'
import TextPage from './pages/TextPage/TextPage.js'


const App = () => (
    <Suspense fallback={(<div>loading...</div>)}>
        <Header></Header>
        <MainImg></MainImg>
        <Switch>
            <Route exact path="/" component={ BoardPage } />
            <Route exact path="/board" component={ TextPage } />
            <Route exact path="/write" component={ WritePage } />
        </Switch>
        <Footer></Footer>
    </Suspense>
);

export default App;



// Suspense는 리액트 내장 컴포넌트로 코드 스플리팅 된 컴포넌트를 로딩하도록 발동시킬 수 있고, 
// 로딩이 끝나지 않았을 때 보여줄 UI를 설정해 줄 수 있다. 
// fallback 이라는 props를 통해 로딩 중에 보여줄 JSX 문법을 지정할 수 있다.
// 파일을 분리하는 작업을 코드 스플리팅