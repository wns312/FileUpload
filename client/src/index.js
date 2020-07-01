import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import PromiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';
import Reducer from './_reducers';
import * as serviceWorker from './serviceWorker';
const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(
    Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
