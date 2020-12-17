import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components/index';
import NavBar from '../components/index';

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
        <NavBar />
        <Button variant="outlined" style={{ marginTop: 20 }} color="primary" onClick={() => this.setState({ isOpen: true })}>
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
