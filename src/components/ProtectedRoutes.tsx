import { Outlet, useNavigate } from 'react-router-dom';
import logAction from '../redux/actions/logAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import React from 'react';

export const ProtectedRoutes = (props) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (logReducer.accessToken === '' || logReducer.roles === 'freshen:user') {
    dispatch(logAction.LogOut());
    navigate('/');
    return;
  }
  return (
    <div className={`layout theme-mode-dark theme-color-blue`}>
      <Sidebar {...props} />
      <div className={'layout__content'}>
        <TopNav />
        <div className={'layout__content-main'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const ProtectedRoutesAdmin = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const navigate = useNavigate();
  //@ts-ignore
  if (logReducer.roles !== 'freshen:admin') {
    navigate('/dashboard');
  }
  return <Outlet />;
};

export const ProtectedRoutesAuthor = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const navigate = useNavigate();
  //@ts-ignore
  if (
    logReducer.roles !== 'freshen:admin' &&
    logReducer.roles !== 'freshen:author'
  ) {
    navigate('/dashboard');
  }
  return <Outlet />;
};
