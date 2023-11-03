require('dotenv').config();
const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

import 'path-browserify';
import 'os-browserify/browser';
import 'crypto-browserify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
