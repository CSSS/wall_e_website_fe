import React from 'react';

import '../stylesheets/UI.css';
import '../stylesheets/Button.css';
import '../stylesheets/Input.css';

function UIRow(props) {
  const { children } = props;

  return (
    <div className="uiRow">
      {children}
    </div>
  );
}

function Button(props) {
  const { img, text, href, onClick } = props;

  if (href !== undefined) {
    return (
      <a className="uiButton" href={href}>
        { img ? <><img src={img} alt={text} />{text}</> : text }
      </a>
    );
  }

  return (
    <button className="uiButton" type="button" onClick={onClick}>
      { img ? <><img src={img} alt={text} />{text}</> : text }
    </button>
  );
}

function Input(props) {
  const { value, onChange } = props;

  return (
    <input
      type="text"
      className="uiInput"
      style={{ width: `${value.toString().length}ch` }}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function HorizontalSpacer(props) {
  const { scale } = props;

  return <div style={{ width: scale.toString(), height: `8px` }}></div>;
}

export {
  UIRow,
  Button,
  Input,
  HorizontalSpacer
};
