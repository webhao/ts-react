import React, { ReactNode, SFC } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

type RouteComponent = RouteProps['component'];
type RouteRender = RouteProps['render'];

function renderFactory(Component: RouteComponent): RouteRender {
  return (props: RouteComponentProps<any>): ReactNode => {
    if (!false || !Component) { // false 判断用户是否登录
      return <Redirect to="login" />;
    }

    return <Component {...props} />;
  };
}

export const AuthorizedRoute: SFC<RouteProps>
  = ({ component, ...rest }) => (<Route {...rest} render={renderFactory(component)} />);
