import React, { Component } from 'react';
import { TextField } from '../../components';
import { Text, Container } from '../../components/TextField/style';

class TextFieldDemo extends Component {
  render() {
    return (
      <>
      <Container>
      <Text>
          <p>This is Disabled Input</p>
        </Text>
        <TextField
          value="Disabled input"
          disabled
        />
        <Text>
          <p>A Valid Input</p>
        </Text>
        <TextField
          value="Accessible"
        />
        <Text>
          <p>An Input with errors</p>
        </Text>
        <TextField
          value="101"
          error="Could not be greater than"
        />
      </Container>
        
      </>
    );
  }
}

export default TextFieldDemo;
