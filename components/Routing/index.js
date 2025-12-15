import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import './index.sass'

import routes from '../../routes'

const Routing = () => {
  const location = useLocation()

  return (
    <section className="routing">
      <Switch location={location}>
        {routes.map((route, key) => {
          return (
            <Route
              exact={route.path === '/'}
              key={route.path}
              path={route.path}
              render={props => <route.content {...props} title={route.title} />}
            />
          )
        })}
      </Switch>
    </section>
  )
}

export default Routing
