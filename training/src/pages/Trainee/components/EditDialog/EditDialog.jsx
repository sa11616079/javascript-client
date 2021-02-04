/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required field'),
  email: yup.string().required('Email Address is required field').matches(/^[A-Za-z.0-9]{3,}@[A-Za-z]{10,10}[.]{1,1}[A-Za-z]{4,4}$/, 'Email Address must be valid field'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  input: {
    paddingRight: 5,
  },
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      error: {
        name: '',
        email: '',
      },
    };
  }

  handleSet = () => {
    const { data } = this.props;
    this.setState({
      name: data.name,
      email: data.email,
    });
  };

  handleOnChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  getError = (field) => {
    const { error } = this.state;
    schema
      .validateAt(field, this.state)
      .then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      })
      .catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    return error[field];
  };

  hasErrors = () => {
    const { error } = this.state;
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    return !!iserror.length;
  };

  render() {
    const {
      open, onClose, data, classes, loading: { loading }, onSubmit,
    } = this.props;
    const {
      name, email,
    } = this.state;
    const { originalId } = data;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="simple-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent className={classes.root}>
          <DialogContentText className={classes.Details}>
            Enter your trainee details
          </DialogContentText>
          <TextField
            label="Name *"
            type="name"
            autoFocus
            fullWidth
            defaultValue={data.name}
            helperText={this.getError('name')}
            onChange={this.handleOnChange('name')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <PersonIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
          <TextField
            label="Email Address"
            type="email"
            autoComplete="off"
            fullWidth
            defaultValue={data.email}
            helperText={this.getError('email')}
            onChange={this.handleOnChange('email')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <EmailIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit({ name: name || data.name, email: email || data.email, originalId });
            }}
            color="primary"
            variant="contained"
          >
            {loading && (
              <CircularProgress size={15} />
            )}
            {loading && <span>Submitting</span>}
            {!loading && <span>Submit</span>}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
EditDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
