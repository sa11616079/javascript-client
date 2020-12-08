import React, { Component } from 'react';
import { Error, Input } from './style';

class TextField extends Component {
  render() {
    
    const { value, disabled, error } = this.props;
    if (error && value) {
      return (
        <>
          <Input type="text" value={value} />
          <Error>{error}</Error>
        </>
      );
    } if (value && !error && !disabled) {
      return (
        <Input type="text" value={value} />
      );
    }
    return (
      <Input type="text" value={value} disabled={disabled} />
    );
  }
}

export default TextField;
