/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import localStorage from 'local-storage';
import PrivateLayout from '../Layouts/PrivateLayout/index';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if ((localStorage.get('token'))) {
        return (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        );
      }
      return (
        <Route>
          <Redirect to="/login" />
        </Route>
      );
    }}
  />
);

export default PrivateRoute;
