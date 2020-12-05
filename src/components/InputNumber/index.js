import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isInRange } from 'utils';
import './styles.scss';

function parseNumber(value) {
  const parsed = value && parseInt(value.split('.').join(','));

  return parsed || '';
}

export default function InputNumber({ label, suffix, placeholder, value, setValue, min, max }) {
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    setIsValid(isInRange(value, min, max));
  }, [ min, max, value ]);

  return (
    <div className={`InputNumber ${ isValid ? '' : 'has-error' }`}>
      <label className="InputNumber__label">{label}</label>
      <input
        type="text"
        className="InputNumber__input"
        placeholder={placeholder}
        onChange={(e => setValue(parseNumber(e.target.value)))}
        value={value}></input>
      {suffix && <span className="InputNumber__suffix">{suffix}</span>}
    </div>
  );
}

InputNumber.propTypes = {
  label: PropTypes.string,
  suffix: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.oneOf(['']) ]),
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};
