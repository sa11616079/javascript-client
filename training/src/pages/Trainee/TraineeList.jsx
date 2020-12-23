import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table } from '../Table/index';
import { AddDialog, EditDialog } from './components/index';
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
      // selected: '',
      orderBy: '',
      order: '',
      page: 0,
      rowsPerPage: 10,
      editData: {},
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleEditButton = () => {
    this.setState({ EditOpen: false });
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data });
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

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

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
      EditOpen, isOpen, order, orderBy, page, rowsPerPage, editData,
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
            onSubmit={this.handleUser}
          />
        </div>
        <EditDialog
          onClose={this.handleEditButton}
          open={EditOpen}
          onSubmit={this.handleEditButton}
          data={editData}
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
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
