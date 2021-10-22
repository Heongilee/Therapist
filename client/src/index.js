import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promisMiddleware from 'redux-promise';
import Reducer from './_reducers/index.js';
import ReduxThunk from 'redux-thunk';
import { ModalProvider } from './context/modalContext';
import ScrollToTop from './utils/ScrollToTop';
import store from './config/store';


ReactDOM.render(
  <Provider store={store()}>
      <BrowserRouter>
          <ScrollToTop/>
          <ModalProvider>
            <App />
          </ModalProvider>
      </BrowserRouter>
  </Provider>

    ,document.getElementById('root')
);


// const createStoreWithMiddleware = applyMiddleware(promisMiddleware, ReduxThunk)(createStore);

// ReactDOM.render(
//     <Provider
//         store={createStoreWithMiddleware(Reducer,
//           window.__REDUX_DEVTOOLS_EXTENSION__ &&
//           window.__REDUX_DEVTOOLS_EXTENSION__()
//         )}
//     >
//       <BrowserRouter>
//           <ScrollToTop/>
//           <ModalProvider>
//             <App />
//           </ModalProvider>
//       </BrowserRouter>
        
//     </Provider>
//     , document.getElementById('root')
// );
