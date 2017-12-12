import React, {Component} from 'react';
import LoginPage from "../AuthPages/LoginPage";

export default class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LoginPage/>
      </div>
    );
  }
}