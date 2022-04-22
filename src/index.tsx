import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles/global.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import { Provider } from "react-redux";

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();