import { Route, Routes } from 'react-router-dom';

import {
  Brands,
  Comments,
  Customer,
  Customers,
  Dashboard,
  Logout,
  News,
  Reports,
} from '../pages';
import { ProtectedRoutes, ProtectedRoutesAdmin } from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Dashboard />} />
      <Route path={'/signin'} element={<Dashboard />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={'/logout'} element={<Logout />} />
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path={'/customers'} element={<Customers />} />
          <Route path={'/customers/:userId'} element={<Customer />} />
          <Route path={'/reports'} element={<Reports />} />
          <Route path={'/comments'} element={<Comments />} />
          <Route path={'/brands'} element={<Brands />} />
        </Route>
        <Route path={'/news'} element={<News />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
