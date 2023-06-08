import { Route, Switch } from 'react-router-dom';

import { Brands, Comments, Customers, Dashboard, Reports } from '../pages';
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
    </Switch>
  );
};

export default Routes;
