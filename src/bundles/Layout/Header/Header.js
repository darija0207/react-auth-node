import React, {Component} from 'react';
import {Link} from "react-router-dom";

const menu = [
  {
    link: '/login',
    label: 'Dashboard'
  }
];


export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      menu
    }
  }

  render() {
    return (
      <div className="navbar navbar-light navbar-toggleable-md bd-navbar container">
        <ul className="navbar-nav mr-auto">
          {this.state.menu.map((item, index) =>
            <li key={index} className="nav-item">
              <Link className="nav-link" to={item.link}>{item.label}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

