import React from 'react'

export default function InputNumber({label, placeholder, value}) {
  return (
    <div className="InputNumber">
      <label className="InputNumber__label">{label}</label>
      <input
        type="number"
        className="InputNumber__input"
        placeholder={placeholder}
        value={value}></input>
    </div>
  )
}
