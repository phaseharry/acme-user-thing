import React from 'react';
import User from './user';

const UserList = props => {
  const userArray = props.data;
  return userArray.map(function(user) {
    return <User info={user} key={user.id} />;
  });
};

export default UserList;
