import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Error from './style';

const RadioField = (props) => {
  const {
    options, onChange, onBlur, error,
  } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input
              type="radio"
              name="game"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {label}
            <br />
          </Fragment>
        ))
      }
      <Error>{error}</Error>
    </>
  );
};
RadioField.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
};
RadioField.defaultProps = {
  error: '',
};
export default RadioField;
