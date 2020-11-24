import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './styles.css';

export default function Link({ href, children }) {
  const [ { scale }, setSpring ] = useSpring(() => ({ scale: 1 }));

  return (
    <animated.a
      className="Link"
      href={href}
      onMouseEnter={() => setSpring({ scale: 1.05 })}
      onMouseLeave={() => setSpring({ scale: 1 })}
      style={{ transform: scale.interpolate(s => `scale(${ s })`) }}>
      {children}
    </animated.a>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any
};
