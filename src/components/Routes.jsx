import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Dashboard, Customers } from '../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} exact component={Dashboard} />
      <Route path={"/customers"} exact component={Customers} />
    </Switch>
  )
}

export default Routes