import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import './assets/css/badge.css';
import './assets/css/dropdown.css';
import './assets/css/layout.css';
import './assets/css/sidebar.css';
import './assets/css/statuscard.css';
import './assets/css/table.css';
import './assets/css/topnav.css';
import { Routes, Sidebar, TopNav } from './components';
import themeAction from './redux/actions/themeActions';

const App = () => {
  const themeReducer = useSelector((state) => state.themeReducer);
  const disptach = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
    const colorClass = localStorage.getItem('themeColor', 'theme-mode-blue');
    disptach(themeAction.setMode(themeClass));
    disptach(themeAction.setColor(colorClass));
  }, [disptach]);

  return (
    <Route
      render={(props) => (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
          <Sidebar {...props} />
          <div className={'layout__content'}>
            <TopNav />
            <div className={'layout__content-main'}>
              <Routes />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default App;
