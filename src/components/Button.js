import React from 'react';

import '../stylesheets/Button.css';

export default function Button(props) {
  const { img, text, href, onClick } = props;

  if (href !== undefined) {
    return (
      <a className="button" href={href}>
        { img ? <><img src={img} alt={text} />{text}</> : text }
      </a>
    );
  }

  return (
    <button className="button" type="button" onClick={onClick}>
      { img ? <><img src={img} alt={text} />{text}</> : text }
    </button>
  );
}
