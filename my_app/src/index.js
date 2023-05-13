import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from './Board';
import "./chessboard.css";
import store from './store';
import {Provider}  from 'react-redux';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render( 
<Provider store={store}>
    <Board />
  </Provider>
  );