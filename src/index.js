import React from 'react';
import ReactDOM from 'react-dom';
import './assets/boxicons-2.1.2/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/index.css'

import { Layout } from "./components"

document.title = "Freshen"

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);
