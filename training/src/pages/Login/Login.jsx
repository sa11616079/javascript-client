import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Box } from '@material-ui/core';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  email: yup.string().required('Email Address is required field').matches(/^[A-Za-z.0-9]{3,}@[A-Za-z]{5,10}[.]{1,1}[A-Za-z]{3,4}$/, 'Email Address must be valid field'),
  password: yup.string().required('Password is required field'),
});

const useStyles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    marginTop: theme.spacing(15),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    paddingRight: 5,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isOpen: false,
      error: {
        email: '',
        password: '',
      },
      hasError: false,
      touched: {
        email: false,
        password: false,
      },
    };
  }

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
        const { onSubmit } = this.props;
        const {
          error, hasError, email, password,
        } = this.state;
        this.hasErrors();
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box mx="auto" bgcolor="background.paper" p={2} className={classes.box} boxShadow={3}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Login
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    id="outlined-full-width"
                    label="Email Address"
                    type="text"
                    autoComplete="off"
                    fullWidth
                    className={classes.TextField}
                    value={email}
                    error={error.email}
                    helperText={this.getError('email')}
                    onBlur={() => this.isTouched('email')}
                    onChange={this.handleChange('email')}
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
                  <TextField
                    id="outlined-full-width"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    fullWidth
                    value={password}
                    error={error.password}
                    helperText={this.getError('password')}
                    onBlur={() => this.isTouched('password')}
                    onChange={this.handleChange('password')}
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      onSubmit({
                        email, password,
                      });
                    }}
                    disabled={hasError}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </Box>
          </Container>
        );
      }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default withStyles(useStyles)(Login);
