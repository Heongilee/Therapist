import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ModalProvider } from './context/modalContext';
import { OpenViduProvider } from './context/openViduContext';

import ScrollToTop from './utils/ScrollToTop';
import store from './config/store';


ReactDOM.render(
  <Provider store={store()}>
      <BrowserRouter>
          <ScrollToTop/>
          <ModalProvider>
          <OpenViduProvider>
            <App />
          </OpenViduProvider>
          </ModalProvider>
      </BrowserRouter>
  </Provider>

    ,document.getElementById('root')
);


