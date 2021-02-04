/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import ls from 'local-storage';
import { Table } from '../../components/Table';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import traineeData from './data/trainee';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts/index';

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
      dataObj: [],
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
      count: 0,
      limit: 20,
      skip: 0,
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
    this.componentDidMount(newPage);
    this.setState({
      page: newPage,
    });
  };

  componentDidMount = () => {
    const { limit, skip, dataObj } = this.state;
    this.setState({ loading: true });
    const value = this.context;
    console.log('recordd : ', value);
    callApi(`trainee/getall?skip=${skip}&limit=${limit}`, 'get', {}).then((response) => {
      console.log('recordd1243 : ', response);
      if (response.data === undefined) {
        this.setState({
          loading: false,
          message: 'This is an error while displaying Trainee',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        const { records } = response.data;
        console.log('recordd : ', records);
        this.setState({ dataObj: records, loading: false, Count: 100 });
        console.log('recordd res : ', response);
        return response;
      }
      console.log('dataObj : ', dataObj);
    });
  }

  // componentDidMount = () => {
  //   this.setState({ isLoaded: true });
  //   const { limit, skip } = this.state;
  //   const value = this.context;
  //   console.log('val :', value);
  //   // eslint-disable-next-line consistent-return
  //   callApi(`trainee/getall?skip=${skip}&limit=${limit}`, 'get', {}).then((response) => {
  //     console.log('response compo', response);
  //     console.log('res data', response.data);
  //     if (response.data === undefined) {
  //       this.setState({
  //         isLoaded: false,
  //       }, () => {
  //       });
  //     } else {
  //       console.log('res inside traineelist :', response);
  //       const record = response.data;
  //       console.log('records aa :', record);
  //       this.setState({ dataObj: record, isLoaded: false, count: 100 });
  //       return response;
  //     }
  //   });
  // }

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
      EditOpen, isOpen, order, orderBy, page,
      rowsPerPage, editData, DeleteOpen, deleteData, dataObj, Count,
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
          data={dataObj}
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
          count={Count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        {/* <div style={{ marginLeft: 15 }}>{this.renderTrainees()}</div> */}
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
