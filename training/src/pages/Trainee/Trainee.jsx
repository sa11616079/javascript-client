import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hoc';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetail';
import client from '../../libs/apollo-client';

const Trainee = ({ match }) => (
  <ApolloProvider client={client}>
    <Switch>
      <Route exact path={match.path} component={TraineeList} />
      <Route path={`${match.path}/:id`} component={TraineeDetails} />
    </Switch>
  </ApolloProvider>
);
const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
Trainee.propTypes = propTypes;
export { Trainee };
