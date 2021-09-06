import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../_reducers';
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const reduxTools =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {

  const store = createStore(rootReducer, reduxTools(applyMiddleware(sagaMiddleware)))
  

  sagaMiddleware.run(rootSaga);

  return store;
}



