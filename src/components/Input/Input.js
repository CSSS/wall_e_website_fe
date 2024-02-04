import React from 'react';
import './Input.css';

export function Input(props) {
  const { value, onChange } = props;

  return (
    <input
      type="text"
      style={{ width: `${value.toString().length}ch` }}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
