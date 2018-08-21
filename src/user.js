import React from 'react';
import Thing from './things';

const User = props => {
  const { name, userthings } = props.info;
  return (
    <div>
      <h3>{name}</h3>
      <div>
        {userthings.map(function(thing) {
          return <Thing details={thing.thing} key={thing.id} />;
        })}
      </div>
    </div>
  );
};

export default User;
