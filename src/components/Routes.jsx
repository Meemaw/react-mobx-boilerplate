import React from 'react'
import Dashboard from './Dashboard'
import Hello from './Hello'
import { root, hello } from '../lib/paths'
import { Route, Switch } from 'react-router-dom'

export default () => {
  return (
    <Switch>
      <Route exact path={root} component={Dashboard} />
      <Route exact path={hello} component={Hello} />
    </Switch>
  )
}
