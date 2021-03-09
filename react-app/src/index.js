import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
