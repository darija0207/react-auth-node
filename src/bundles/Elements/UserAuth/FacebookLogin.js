import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookLoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }
  }

  async onSuccess(response) {
    this.setState({
      id: response.id,
      email: response.email,
      user: response.name,
      token: response.accessToken,
    });
    let data = {
      id: this.state.id,
      email: this.state.email,
      access_token: this.state.token
    };
    await fetch('api/users/oauth/facebook', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(body => {
        localStorage.setItem('token', this.state.token);
        return body;
      }).catch(err => err);
    this.props.getUser(this.state.user);
  };


  render() {
    return (
      <FacebookLogin
        appId="2013561785558847"
        icon="fa-facebook"
        scope="email"
        cssClass="social-button"
        textButton="Sign in with Facebook"
        callback={this.onSuccess.bind(this)}/>
    )
  }
};