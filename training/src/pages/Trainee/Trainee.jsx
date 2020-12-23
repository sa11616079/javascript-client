import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetail';

const Trainee = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={TraineeList} />
    <Route path={`${match.path}/:id`} component={TraineeDetails} />
  </Switch>
);
const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
Trainee.propTypes = propTypes;
export { Trainee };
