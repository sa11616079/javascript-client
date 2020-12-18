import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    error, onChange, onBlur, value, disabled,
  } = props;
  return (
    <>
      <Input type="text" onChange={onChange} value={value} onBlur={onBlur} disabled={disabled} />
      <Error>{error}</Error>
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  disabled: false,
  error: '',
};

export default TextField;
