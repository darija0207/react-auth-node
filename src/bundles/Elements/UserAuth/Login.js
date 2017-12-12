import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from "react-router";


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      login_email: '',
      login_password: ''
    };

    this.loginUser = this.loginUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  async loginUser(event) {
    event.preventDefault();
    let data = {
      email: this.state.login_email,
      password: this.state.login_password
    };
    await fetch('api/users/signin', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => this.checkStatus(res))
      .then(body => {
        localStorage.setItem('token', body.token);
        this.props.handleSuccessAuth();
        return body;
      }).catch(err => err);
    this.props.getUser(this.state.user);
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      this.setState({errorMessage: response.statusText});
      throw error;
    }
  }

  async getUserId() {
    try {
      let response = await fetch('api/users');
      let data = await response.json();
      let userItem = data.filter(item => item.local.email === this.state.login_email);
      this.setState({user: userItem.local.first_name + ' ' + userItem.local.last_name});
    } catch (error) {
      throw new Error('Не удалось получить пользователя');
    }
  }

  render() {
    return (
      <div>
        <h2 className="text-center mb-5">Login</h2>
        <form onSubmit={this.loginUser}>
          {this.state.errorMessage ? (
            <div className="alert alert-danger">
              {this.state.errorMessage}
            </div>
          ) : (
            <span/>
          )}
          <input type="email" name="login_email" required placeholder="email" className="form-control mb-2"
                 onChange={this.handleInputChange} value={this.state.login_email}/>
          <input type="password" name="login_password" required placeholder="password" className="form-control mb-2"
                 onChange={this.handleInputChange} value={this.state.login_password}/>
          <RaisedButton type="submit" label="Login"/>
        </form>
      </div>
    )
  }
}
