import React, {Component} from 'react';
import {Switch, Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import MainPage from "../../Pages/MainPage/MainPage";
import UserDashboard from "../../Pages/DashboardPage/DashboardPage";
import LoginPage from "../../Pages/AuthPages/LoginPage";

export default class Content extends Component {

  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/dashboard" component={UserDashboard}/>
        </Switch>
      </Router>
    )
  }
}

