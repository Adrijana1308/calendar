import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import { QueryParamCalControler } from './QueryParamCalControler';

function App() {
  return (
    <BrowserRouter>
      <QueryParamCalControler />
    </BrowserRouter>
  );
}

export default App;
