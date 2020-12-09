import React from 'react';
import PropTypes from 'prop-types';
import clssnames from 'classnames';
import './styles.scss';

export default function Button({ onClick, isDisabled, isHidden, isAccent, children }) {
  const classes = clssnames({
    'Button': true,
    'is-disabled': isDisabled,
    'is-hidden': isHidden,
    'is-accent': isAccent
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={isDisabled}>{children}</button>
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
