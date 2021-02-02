/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { Mutation } from '@apollo/react-components';
import { GET_TRAINEE } from './query';
import { Table } from '../../components/Table';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import traineeData from './data/trainee';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE } from './mutation';
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

  onAddTrainee = async (data, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      this.setState({
        open: false,
      }, () => {
        refetch();
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  }

  onEditTrainee = async (data, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, originalId } = data;
      console.log('data is :', data);
      const r = await updateTrainee({ variables: { name, email, originalId } });
      console.log('r : ', r);
      this.setState({
        EditOpen: false,
      }, () => {
        refetch();
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  onDeleteTrainee = async (data, deleteTrainee, openSnackBar, refetch) => {
    const { originalId } = data;
    const response = await deleteTrainee({ variables: { originalId } });
    if (response) {
      refetch();
      this.setState({
        DelOpen: false,
      }, () => {
        openSnackBar('Trainee Deleted Successfully', 'success');
      });
    }
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

  handlePageChange = (refetch) => async (event, newPage) => {
    const { data: { variables } } = this.props;
    await this.setState({ page: newPage });
    refetch({ variables });
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
      rowsPerPage, editData, DeleteOpen, deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { records = [], TraineeCount = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    const variables = { skip: (page * rowsPerPage), limit: rowsPerPage };
    return (
      <>
        <Mutation
          mutation={DELETE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(deleteTrainee, delLoader = { loading }) => (
            <Mutation
              mutation={CREATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(createTrainee, createrLoader = { loading }) => (
                <Mutation
                  mutation={UPDATE_TRAINEE}
                  refetchQueries={[{ query: GET_TRAINEE, variables }]}
                >
                  {(updateTrainee, updateLoader = { loading }) => (
                    <MyContext.Consumer>
                      {({ openSnackBar }) => (
                        <>
                          <div className={classes.dialog}>
                            <Button className={classes.traineeButton} variant="outlined" color="primary" onClick={() => this.setState({ isOpen: true })}>
                              ADD TRAINEELIST
                            </Button>
                            <AddDialog
                              onClose={this.handleClose}
                              isOpen={isOpen}
                              onSubmit={(data) => this.onAddTrainee(data, openSnackBar,
                                createTrainee, refetch)}
                              loading={createrLoader}
                            />
                          </div>
                          <EditDialog
                            onClose={this.handleEditButton}
                            open={EditOpen}
                            onSubmit={
                              (data) => this.onEditTrainee(data, openSnackBar,
                                updateTrainee, refetch)
                            }
                            data={editData}
                            loading={updateLoader}
                          />
                          <DeleteDialog
                            data={deleteData}
                            onClose={this.handleDeleteButton}
                            onSubmit={
                              (data) => this.onDeleteTrainee(data, deleteTrainee,
                                openSnackBar, refetch)
                            }
                            open={DeleteOpen}
                            loading={delLoader}
                          />
                          <Table
                            loader={loading}
                            id="id"
                            data={records}
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
                            count={Number(TraineeCount)}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onChangePage={this.handlePageChange(refetch)}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          />
                          {/* <div style={{ marginLeft: 15 }}>{this.renderTrainees()}</div> */}
                        </>
                      )}
                    </MyContext.Consumer>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 20 } },
  }),
)(TraineeList);
// export default withStyles(useStyles)(TraineeList);
