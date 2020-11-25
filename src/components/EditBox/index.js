import React from 'react';
import PropTypes from 'prop-types';
import * as icons from 'icons';
import './styles.scss';

export default function EditBox({ label, content, onClick }) {
  return (
    <div className="EditBox">
      <label className="EditBox__label">{label}</label>
      <div className="EditBox__content">
        <span className="EditBox__content-text" title={content}>{content}</span>
        <icons.edit className="EditBox__content-edit" onClick={onClick}/>
      </div>
    </div>
  );
}

EditBox.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  content: PropTypes.string
};
