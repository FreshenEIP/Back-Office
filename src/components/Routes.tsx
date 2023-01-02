import { Route, Switch } from 'react-router-dom';

import { Brands, Comments, Customers, Dashboard, Reports } from '../pages';

const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={Dashboard} />
      <Route path={'/customers'} exact component={Customers} />
      <Route path={'/reports'} exact component={Reports} />
      <Route path={'/comments'} exact component={Comments} />
      <Route path={'/brands'} exact component={Brands} />
    </Switch>
  );
};

export default Routes;
