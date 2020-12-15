import React from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './style';

const ButtonField = (props) => {
  const {
    color, disabled, style, value, onClick,
  } = props;
  return (
    <>
      <Buttons
        type={value}
        style={style}
        color={color}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </Buttons>
    </>
  );
};
ButtonField.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
};
ButtonField.defaultProps = {
  color: '',
  disabled: false,
  style: {},
};
export default ButtonField;
