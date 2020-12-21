import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AddDialog } from './components/index';
import traineeData from './data/trainee';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  renderTrainee = (trainee) => {
    const { match } = this.props;
    return (
      <li>
        <Link to={`${match.path}/${trainee.id}`}>
          {trainee.name}
        </Link>
      </li>
    );
  }

  renderTrainees = () => {
    <ul>
      {
        traineeData.map((trainee) => this.renderTrainee(trainee))
      }
    </ul>;
  }

  render() {
    const { isOpen } = this.state;
    const { match: { url } } = this.props;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={() => this.setState({ isOpen: true })}>
          ADD TRAINEE
        </Button>
        {this.renderTrainees()}
        <AddDialog
          onClose={this.handleClose}
          isOpen={isOpen}
          onSubmit={this.handleUser}
        />
        <ul>
          {traineeData.map(({ name, id }) => (
            <li key={id}>
              <Link to={`${url}/${id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default TraineeList;
