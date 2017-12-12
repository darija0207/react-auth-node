import React, {Component} from 'react';
import TwitterLogin from 'react-twitter-auth';
import {Redirect} from "react-router";

export default class TwitterLoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: '',
    };
  }

  onSuccess(response) {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({
          isAuthenticated: true,
          user: user.twitter.displayName,
          token: token
        });
        localStorage.setItem('token', token);
      }
    });
    this.props.getUser(this.state.user);
  };

  onFailed = (error) => {
    console.log(error);
  };

  render() {
    return (
      <div>
        {this.state.isAuthenticated ? (<Redirect to={{
            pathname: '/dashboard',
            state: {
              user: this.state.user,
              token: this.state.token,
              isAuthenticated: true
            }
          }}/>
        ) : (
          <TwitterLogin loginUrl="/api/users/oauth/twitter"
                        onFailure={this.onFailed}
                        onSuccess={this.onSuccess.bind(this)}
                        className="social-button twitter"
                        requestTokenUrl="/api/users/oauth/twitter/reverse"/>
        )
        }
      </div>
    );
  }
}