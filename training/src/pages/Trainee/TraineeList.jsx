/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table } from '../Table/index';
import { AddDialog } from './components/index';
import traineeData from './data/trainee';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';

const useStyles = (theme) => ({
  traineeButton: {
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});
class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: '',
      orderBy: '',
      order: '',
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log('datdd ... ', data));
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
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

  renderTrainees() {
    return (
      <ul>
        {
          traineeData.map((trainee) => this.renderTrainee(trainee))
        }
      </ul>
    );
  }

  render() {
    const { isOpen, order, orderBy } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.dialog}>
          <Button className={classes.traineeButton} variant="outlined" color="primary" onClick={() => this.setState({ isOpen: true })}>
            ADD TRAINEELIST
          </Button>
          <AddDialog
            onClose={this.handleClose}
            isOpen={isOpen}
            onSubmit={this.handleUser}
          />
        </div>
        <Table
          id="id"
          data={traineeData}
          columns={[
            {
              field: 'name',
              lable: 'Name',
            },
            {
              field: 'email',
              lable: 'Email Address',
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              lable: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        {/* <div style={{ marginLeft: 15 }}>{this.renderTrainees()}</div> */}
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
