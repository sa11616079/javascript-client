import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Error from './style';

const RadioGroup = (props) => {
  const {
    options, onChange, onBlur, error,
  } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="game" value={value} onChange={onChange} onBlur={onBlur} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <Error>{error}</Error>
    </>
  );
};
RadioGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
};
RadioGroup.defaultProps = {
  error: '',
};
export default RadioGroup;
