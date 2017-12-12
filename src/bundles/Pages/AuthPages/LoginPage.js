import React, {Component} from 'react';
import Header from "../../Layout/Header/Header";
import Login from "../../Elements/UserAuth/Login";
import FacebookLoginView from "../../Elements/UserAuth/FacebookLogin";
import TwitterLoginView from "../../Elements/UserAuth/TwitterLogin";
import {Redirect} from "react-router";
import Register from "../../Elements/UserAuth/Register";
import {Tab, Tabs} from "material-ui";
import SwipeableViews from 'react-swipeable-views';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: '',
      slideIndex: 0,
    }
  }

  handleSuccessAuth() {
    this.forceUpdate();
  }

  successLogin() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }

  getUser(user) {
    this.setState({
      user: user
    })
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const isAuthenticated = this.successLogin();
    return (
      <div>
        {isAuthenticated ? (<Redirect to={{
          pathname: '/dashboard',
          state: {
            user: this.state.user,
            isAuthenticated: true,
          }
        }}/>) : (
          <div>
            <Header/>
            <div className="container">
              <div>
                <Tabs
                  className="row tabs"
                  onChange={this.handleChange}
                  value={this.state.slideIndex}
                >
                  <Tab label="I have account" value={0} className="col-6"/>
                  <Tab label="Become a member" value={1} className="col-6"/>
                </Tabs>
                <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}
                  slideClassName="container"
                >
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h4>Where does it come from?</h4>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                        Latin
                        professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                        consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                        literature, discovered the undoubtable source. Lorem Ipsum comes from sections.</p>
                    </div>
                    <div className="col-6">
                      <Login successAuth={this.handleSuccessAuth.bind(this)}
                             getUser={this.getUser.bind(this)}/>
                      <FacebookLoginView getUser={this.getUser.bind(this)}/>
                      <TwitterLoginView getUser={this.getUser.bind(this)}/>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-6">
                      <h4>Where can I get some?</h4>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                        anything embarrassing hidden in the middle of text. </p>
                    </div>
                    <div className="col-6">
                      <Register successAuth={this.handleSuccessAuth.bind(this)}
                                getUser={this.getUser.bind(this)}/>
                    </div>
                  </div>
                </SwipeableViews>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  }
}