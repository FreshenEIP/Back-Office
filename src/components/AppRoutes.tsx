import { Route, Routes } from 'react-router-dom';

import {
  Brands,
  Comments,
  Customer,
  Customers,
  Dashboard,
  Login,
  Logout,
  News,
  Reports,
  Suggestions,
} from '../pages';
import { ProtectedRoutes, ProtectedRoutesAdmin } from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/logout'} element={<Logout />} />
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path={'/customers'} element={<Customers />} />
          <Route path={'/customers/:userId'} element={<Customer />} />
          <Route path={'/reports'} element={<Reports />} />
          <Route path={'/comments'} element={<Comments />} />
          <Route path={'/brands'} element={<Brands />} />
          <Route path={'/suggestion'} element={<Suggestions />} />
        </Route>
        <Route path={'/news'} element={<News />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
