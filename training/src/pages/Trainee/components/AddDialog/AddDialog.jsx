import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

function AddDialog(props) {
  const { isOpen } = props;
  return (
    <Dialog open={isOpen}>
      <DialogTitle id="simple-dialog-title">Add Trainee</DialogTitle>
      <div>
        <TextField
          id="outlined-full-width"
          label="Name *"
          style={{ margin: 8 }}
          placeholder=""
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <PersonIcon style={{ margin: 0 }} />
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Email Address"
          style={{ margin: 8 }}
          placeholder=""
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <EmailIcon style={{ py: 20 }} />
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Password"
          style={{ margin: 8 }}
          placeholder=""
          helperText="Full width!"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <VisibilityOffIcon style={{ margin: 0 }} />
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Confirm Password"
          style={{ margin: 8 }}
          placeholder=""
          helperText="Full width!"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <VisibilityOffIcon style={{ margin: 0 }} />
            ),
          }}
          variant="outlined"
        />
      </div>
    </Dialog>
  );
}
AddDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
export default AddDialog;
