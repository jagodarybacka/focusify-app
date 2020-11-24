import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Header({ label }) {
  return <div className="Header">{label}</div>;
}

Header.propTypes = {
  label: PropTypes.string
};
