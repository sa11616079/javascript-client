import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={() => this.setState({ isOpen: true })}>
          ADD TRAINEE
        </Button>
        <AddDialog
          onClose={this.handleClose}
          isOpen={isOpen}
        />
      </>
    );
  }
}
export default Trainee;
