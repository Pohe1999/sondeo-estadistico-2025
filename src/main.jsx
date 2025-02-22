// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import PreSondeoDos from './components/PreSondeoDos';
import PreSondeoEstadistico from './components/PreSondeoEstadistico';


 ReactDOM.render(
  <BrowserRouter>
    <PreSondeoEstadistico />
  </BrowserRouter>,
  document.getElementById('root')
);
