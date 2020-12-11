import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    error, onChange, onBlur,
  } = props;
  return (
    <>
      <Input type="text" onChange={onChange} defaultValue="" onBlur={onBlur} />
      <Error>{error}</Error>
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
