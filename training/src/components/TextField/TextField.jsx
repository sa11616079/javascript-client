import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    value, disabled, error,
  } = props;
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
};

TextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
