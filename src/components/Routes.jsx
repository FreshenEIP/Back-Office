import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Dashboard, Customers } from '../pages'

const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/customers"} component={Customers} />
    </Switch>
  )
}

export default Routes