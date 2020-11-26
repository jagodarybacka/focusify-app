import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default function Icon({ render, onClick, width, height }) {
  const styles = {
    width: width || '1rem',
    height: height || '1rem'
  };

  return <div style={styles} className="Icon" onClick={onClick}>{render()}</div>;
}

Icon.propTypes = {
  render: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.oneOf([ PropTypes.string, PropTypes.number ]),
  height: PropTypes.oneOf([ PropTypes.string, PropTypes.number ])
};
