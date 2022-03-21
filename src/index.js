import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './assets/boxicons-2.1.2/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/index.css'

import App from "./App.js"

document.title = "Freshen"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
