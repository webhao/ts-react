import React, { SFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { AuthorizedRoute } from './core/authorized-route';
import { LoginComponent } from './core/login/login';
import { HomeComponent } from './home/home';

export const App: SFC = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginComponent} />
      <AuthorizedRoute path="/" component={HomeComponent} />
    </Switch>
  </Router>
);
