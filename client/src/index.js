import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { persistor, store } from './redux/store';
import { Provider} from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = env.process.REACT_APP_SERVER;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.withCredentials = true;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate> 
        </Provider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
