import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import { CalendarController } from './CalendarController';

function App() {
  return (
    <BrowserRouter>
      <CalendarController />
    </BrowserRouter>
  );
}

export default App;
