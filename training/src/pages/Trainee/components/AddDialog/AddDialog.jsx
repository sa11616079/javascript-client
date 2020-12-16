import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Please Enter your Name'),
});

// eslint-disable-next-line no-unused-vars
// const useStyles = () => ({
//   root: {
//     flexGrow: 1,
//   },
// });
const useStyles = () => ({
  TextField: {
    width: 900,
    marginLeft: 30,
  },
  input: {
    paddingRight: 10,
  },
  textField: {
    width: 435,
    marginLeft: 30,
  },
  Error: {
    fontSize: 15,
    color: 'red',
  },
  Details: {
    marginLeft: 25,
    marginBottom: 0,
  },
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isOpen: false,
      error: {
        name: '',
      },
      hasError: false,
      touched: {
        name: false,
      },
    };
  }

  // handleNameChange = (e) => {
  //   this.setState({ name: e.target.value }, () => {
  //   });
  // }

  handleBlur = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema.isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  render() {
    const { classes } = this.props;
    // const classes = useStyles();
    const { isOpen, onClose } = this.props;
    const {
      name, error,
    } = this.state;
    this.hasErrors();
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="simple-dialog-title">Add Trainee</DialogTitle>
        <DialogContentText className={classes.Details}>
          Enter your trainee details
        </DialogContentText>
        <TextField
          id="outlined-full-width"
          label="Name *"
          type="text"
          autoComplete="off"
          value={name}
          error={error.name}
          helperText={this.getError('name')}
          onBlur={() => this.isTouched('name')}
          onChange={this.handleChange('name')}
          className={classes.TextField}
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
          id="outlined-full-width"
          label="Email Address"
          type="text"
          autoComplete="off"
          className={classes.TextField}
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
        <Grid container spacing={12}>
          <Grid>
            <TextField
              id="outlined-full-width"
              label="Password"
              type="password"
              autoComplete="off"
              className={classes.textField}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <VisibilityOffIcon className={classes.input} />
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              id="outlined-full-width"
              label="Confirm Password"
              autoComplete="off"
              type="password"
              className={classes.textField}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <VisibilityOffIcon className={classes.input} />
                ),
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" disabled>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
AddDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default withStyles(useStyles)(AddDialog);
