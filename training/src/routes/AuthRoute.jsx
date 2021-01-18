/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import localStorage from 'local-storage';
import AuthLayout from '../Layouts/AuthLayout/index';

// eslint-disable-next-line react/prop-types
const LoginLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (!(localStorage.get('token'))) {
        return (
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        );
      }
      return (
        <Route>
          <Redirect to="/trainee" />
        </Route>
      );
    }}
  />
);

export default LoginLayoutRoute;
