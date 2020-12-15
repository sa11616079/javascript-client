import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    value, disabled, error,
  } = props;
  return (
    <>
      <Input type="text" value={value} disabled={disabled} />
      <Error>{error}</Error>
    </>
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
