import { Navigate, Outlet } from 'react-router-dom';
import logAction from '../redux/actions/logAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const ProtectedRoutes = () => {
  const logReducer = useAppSelector((state) => state.logReducer);
  //@ts-ignore
  const dispatch = useAppDispatch();
  if (logReducer.accessToken === '' || logReducer.roles === 'freshen:user') {
    dispatch(logAction.LogOut());
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export const ProtectedRoutesAdmin = () => {
  const logReducer = useAppSelector((state) => state.logReducer);
  //@ts-ignore
  if (logReducer.roles !== 'freshen:admin') {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export const ProtectedRoutesAuthor = () => {
  const logReducer = useAppSelector((state) => state.logReducer);
  //@ts-ignore
  if (
    logReducer.roles !== 'freshen:admin' &&
    logReducer.roles !== 'freshen:author'
  ) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};
