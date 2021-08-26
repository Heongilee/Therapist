import React, { Suspense }  from 'react';
import {Switch, Route } from "react-router-dom";
import Header from './components/Header/Header.js';
import MainImg from './components/MainImg/MainImg.js';
import Footer from './components/Footer/Footer.js';
import MainPage from './pages/MainPage/MainPage.js';
import BoardPage from './pages/BoardPage/BoardPage.js';
import WritePage from './pages/WritePage/WritePage.js';
import PostPage from './pages/PostPage/PostPage.js';
import MyPage from './pages/Mypage/Mypage.js';
import { Page404 } from './pages/ErrorPage/ErrorPage';
import Auth from './hook/useAuth';


const App = () => (
    <Suspense fallback={(<div>loading...</div>)}>
        <Header/>
        <MainImg/>
        <Switch>
            <Route exact path="/" component={ MainPage } />
            <Route exact path="/board" component={ BoardPage } />
            <Route exact path="/posts/:postId" component={ PostPage } />
            <Route exact path="/write" component={ WritePage } />
            <Route exact path="/mypage" component={ MyPage } />
            <Route component={ Page404 } />

        </Switch>
        <Footer/>
    </Suspense>
);

export default App;
