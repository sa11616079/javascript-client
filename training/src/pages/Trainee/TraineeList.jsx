/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table } from '../../components/Table/index';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
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
      EditOpen: false,
      DeleteOpen: false,
      selected: '',
      orderBy: '',
      order: '',
      page: 0,
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleClick = (status, data) => {
    this.setState({ isOpen: status }, () => { console.log(data); });
  };

  handleEditButton = (data) => {
    this.setState({ EditOpen: false }, () => { console.log('Edited Item ', data.data); });
  }

  handleDeleteButton = (data) => {
    this.setState({ DeleteOpen: false }, () => { console.log('Deleted Item ', data.data); });
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data, this.state));
  };

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DeleteOpen: true, deleteData: data });
  }

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

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
    const {
      EditOpen, isOpen, order, orderBy, page, rowsPerPage, editData, DeleteOpen, deleteData,
    } = this.state;
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
            onSubmit={(data) => this.handleClick(false, data)}
          />
        </div>
        <EditDialog
          onClose={this.handleEditButton}
          open={EditOpen}
          onSubmit={this.handleEditButton}
          data={editData}
        />
        <DeleteDialog
          data={deleteData}
          onClose={this.handleDeleteButton}
          onSubmit={this.handleDeleteButton}
          open={DeleteOpen}
        />
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
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
