import React, { SFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { configure } from 'mobx';

import { AuthorizedRoute } from './core/authorized-route';
import { LoginComponent } from './core/login/login';
import { HomeComponent } from './home/home';

configure({ enforceActions: true });

export const App: SFC = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginComponent} />
      <AuthorizedRoute path="/" component={HomeComponent} />
    </Switch>
  </Router>
);
