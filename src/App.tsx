import { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './redux/hooks';

const App = () => {
  const themeReducer = useAppSelector((state) => state.themeReducer);
  const disptach = useAppDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode');
    const colorClass = localStorage.getItem('themeColor');
    disptach(themeAction.setMode(themeClass));
    disptach(themeAction.setColor(colorClass));
  }, [disptach]);

  return (
    <Route
      render={(props) => (
        // @ts-ignore
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
