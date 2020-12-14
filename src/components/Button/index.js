import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import clssnames from 'classnames';
import './styles.scss';

export default function Button({ onClick, isDisabled, isHidden, isAccent, children }) {
  const [ { scale }, setSpring ] = useSpring(() => ({ scale: 1 }));
  const classes = clssnames({
    'Button': true,
    'is-disabled': isDisabled,
    'is-hidden': isHidden,
    'is-accent': isAccent
  });

  return (
    <animated.button
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setSpring({ scale: 1.05 })}
      onMouseLeave={() => setSpring({ scale: 1 })}
      style={{ transform: scale.interpolate(s => `scale(${ s })`) }}>
      {children}
    </animated.button>
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
