import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default function Button({ onClick, isDisabled, isHidden, isAccent, children }) {
  return (
    <button
      className={`Button ${ isDisabled ? 'is-disabled' : '' } ${ isHidden ? 'is-hidden' : '' } ${ isAccent ? 'is-accent' : '' }`}
      onClick={onClick}>{children}</button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isAccent: PropTypes.bool,
  isHidden: PropTypes.bool,
  children: PropTypes.any
};

Button.defaultProps = {
  isDisabled: false,
  isHidden: false,
  isAccent: false
};
