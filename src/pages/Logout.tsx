import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import logAction from '../redux/actions/logAction';
import { useAppDispatch } from '../redux/hooks';
import React from 'react';

const Logout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logAction.LogOut());
    toast.success('Successfully logout');
  }, [dispatch]);
  return <Navigate to='/' />;
};

export default Logout;
