import React, { Component } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react';

import UserStore from './user.store';

@observer
export class AuthorizedRoute extends Component<RouteProps> {
  render() {
    if (UserStore.isLogin) {
      return <Route {...this.props} />;
    }

    return <Redirect to="login" />;
  }
}
