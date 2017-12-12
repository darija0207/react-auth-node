import React, {Component} from 'react';
import Header from "../../Layout/Header/Header";
import { Redirect } from 'react-router-dom';
import Register from "../../Elements/UserAuth/Register";

export default class RegisterPage extends Component {

  constructor(props) {
    super(props);
  }

  handleSuccessLogin(){
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Header/>
        <Register onSuccessfullLogin={this.handleSuccessLogin.bind(this)}/>
      </div>
    );
  }
}