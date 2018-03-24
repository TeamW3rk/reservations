import React from 'react';
import ReactDom from 'react-dom';
import Reservations from './components/App';

ReactDom.render(<Reservations />, document.getElementById('reservations')); 

window.Reservations = Reservations;