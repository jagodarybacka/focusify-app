import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Button({ onClick, isDisabled, isHidden, children }) {
  return (
    <button
      className={`Button ${ isDisabled ? 'is-disabled' : '' } ${ isHidden ? 'is-hidden' : '' }`}
      onClick={onClick}>{children}</button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  children: PropTypes.any
};

Button.defaultProps = {
  isDisabled: false,
  isHidden: false
};
