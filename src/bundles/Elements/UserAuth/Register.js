import React, {Component} from 'react';
import {RaisedButton} from "material-ui";

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: ''
    };

    this.addUser = this.addUser.bind(this);
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

  async addUser(event) {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone
    };
    await fetch('api/users/signup', {
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

    this.props.getUser(this.state.first_name + ' ' + this.state.last_name);
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

  render() {
    return (
      <div>
        <h2 className="text-center mb-5">Registration</h2>
        <form onSubmit={this.addUser}>
          {this.state.errorMessage ? (
            <div className="alert alert-danger">
              {this.state.errorMessage}
            </div>
          ) : (
            <span/>
          )}
          <input type="text" name="first_name" placeholder="First name" className="form-control mb-2"
                 onChange={this.handleInputChange} value={this.state.first_name}/>
          <input type="text" name="last_name" placeholder="Last name" className="form-control mb-2"
                 onChange={this.handleInputChange} value={this.state.last_name}/>
          <input type="email" name="email" placeholder="Email" className="form-control mb-2" required
                 onChange={this.handleInputChange} value={this.state.email}/>
          <input type="password" name="password" placeholder="Password" className="form-control mb-2" required
                 onChange={this.handleInputChange} value={this.state.password}/>
          <input type="phone" name="phone" placeholder="Phone" className="form-control mb-2"
                 onChange={this.handleInputChange} value={this.state.phone}/>
          <RaisedButton type="submit" label="Registration"/>
        </form>
      </div>
    )
  }
}