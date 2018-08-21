import React from 'react';

const Button = props => {
  const fnc = props.fnc;
  return <button onClick={fnc}>{props.name}</button>;
};

export default Button;
