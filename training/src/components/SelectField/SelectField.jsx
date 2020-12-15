import React from 'react';
import PropTypes from 'prop-types';
import Select, { Error } from './style';

const SelectField = (props) => {
  const {
    options, defaultOptions, onChange, values, onBlur, error,
  } = props;
  return (
    <>
      <Select value={values} onChange={onChange} onBlur={onBlur}>
        {defaultOptions && <option>{defaultOptions}</option>}
        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }
      </Select>
      <Error>
        {error}
      </Error>
    </>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultOptions: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
};
SelectField.defaultProps = {
  error: '',
};

export default SelectField;
