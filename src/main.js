import React from 'react';
import Button from './button';
import UserList from './userList';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      button: {},
      users: [],
    };
    this.usersWithThings = this.usersWithThings.bind(this);
    this.allUsers = this.allUsers.bind(this);
  }
  async componentDidMount() {
    const users = await axios.get('/api/');
    this.setState({
      users: users.data,
      button: { withThings: false },
    });
  }
  async usersWithThings() {
    const users = await axios.get('/api/users');
    this.setState({
      users: users.data,
      button: { withThings: true },
    });
  }
  async allUsers() {
    const users = await axios.get('/api/');
    console.log(users);
    this.setState({
      users: users.data,
      button: { withThings: false },
    });
  }
  render() {
    if (!this.state.button.withThings) {
      return (
        <div>
          <Button fnc={this.usersWithThings} name="Only users with things" />
          <UserList data={this.state.users} />
        </div>
      );
    } else {
      return (
        <div>
          <Button fnc={this.allUsers} name="Show all users" />
          <UserList data={this.state.users} />
        </div>
      );
    }
  }
}

export default Main;
