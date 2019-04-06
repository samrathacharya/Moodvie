import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "./css/button.css";
import "./css/result.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import Home from "./Home";

const textBoxStyle = {
  width: "400px"
};

const iconMargin = {
  marginLeft: "10px"
};

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  checkToken() {
    if (localStorage.getItem("usertoken") === null) {
      return <Redirect to="/home" />;
    }
  }

  render() {
    const loginLink = (
      <React.Fragment>
        <div className="headerContainer">
          <Moodvie_result_icon />
          <ul>
            <li>
              <Link to="users/login">Login</Link>
            </li>
            <li>
              <Link to="users/register">Register</Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );

    const userLink = (
      <React.Fragment>
        <div className="headerContainer">
          <Moodvie_result_icon />
          <ul>
            <li>
              <a href="" onClick={this.logout.bind(this)}>
                LogOut
              </a>
            </li>
            <li>
              <Link to="user">My Profile</Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
    return (
      <div>
        {this.checkToken}
        {localStorage.usertoken ? userLink : loginLink}
      </div>
    );
  }
}

export default withRouter(Landing);
