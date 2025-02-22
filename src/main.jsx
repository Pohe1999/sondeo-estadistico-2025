// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import PreSondeoDos from './components/PreSondeoDos';
import PreSondeoTresEstado from './components/PreSondeoTresEstado';
import PreSondeoEstadistico from './components/PreSondeoDos';

 ReactDOM.render(
  <BrowserRouter>
    <PreSondeoTresEstado />
  </BrowserRouter>,
  document.getElementById('root')
);
