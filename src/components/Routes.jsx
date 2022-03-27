import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Dashboard, Customers, Reports } from '../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} exact component={Dashboard} />
      <Route path={"/customers"} exact component={Customers} />
      <Route path={"/reports"} exact component={Reports} />
    </Switch>
  )
}

export default Routes