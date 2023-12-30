import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import logAction from '../redux/actions/logAction';
import sidebarAction from '../redux/actions/sidebarAction';
import { useAppDispatch } from '../redux/hooks';

const Logout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logAction.LogOut());
    dispatch(sidebarAction.setSideBarIndex(0));
    toast.success('Successfully logout');
  }, [dispatch]);
  return <Navigate to='/' />;
};

export default Logout;
