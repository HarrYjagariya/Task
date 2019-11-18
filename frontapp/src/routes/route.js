import React from 'react';
import SignIn from './../component/login'
import SignUn from './../component/signup'
import Dashboard from './../component/dashboard'
import Profile from './../component/profile'
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {PrivateRoute ,PublicRoute}  from './privateRoutes'

export default function Routes() {
    return (
        <Router>
          <Switch>
              <PublicRoute exact path='/' component={SignIn} />
              <PublicRoute path='/SignUp' component={SignUn} />
              <PrivateRoute path='/Dashboard' component={Dashboard} />
              <PrivateRoute path='/Profile/:id' component={Profile} />
          </Switch>
      </Router>
    )
}

