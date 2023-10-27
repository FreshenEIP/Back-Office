import { Route, Switch } from 'react-router-dom';

import {
  Brands,
  Comments,
  Customers,
  Dashboard,
  News,
  Reports,
} from '../pages';
import { Customer } from '../pages/Customer';

const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={Dashboard} />
      <Route path={'/customers'} exact component={Customers} />
      <Route path={'/customers/:userId'} exact component={Customer} />
      <Route path={'/reports'} exact component={Reports} />
      <Route path={'/comments'} exact component={Comments} />
      <Route path={'/brands'} exact component={Brands} />
      <Route path={'/news'} exact component={News} />
    </Switch>
  );
};

export default Routes;
