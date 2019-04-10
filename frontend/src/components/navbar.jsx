import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "./css/button.css";
import "./css/result.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import userImage from "../assets/user.jpg";
import Home from "./Home";
import jwt_decode from "jwt-decode";

const textBoxStyle = {
  width: "400px"
};

const iconMargin = {
  marginLeft: "10px"
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loggedIn: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("usertoken") !== null) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        name: decoded.identity.username,
        loggedIn: true
      });
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
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
          <div className="icon">
            <Moodvie_result_icon />
          </div>
          <div className="userLog">
            <h4>Hello, {this.state.name}</h4>
            <button
              className="btn btn-lg btn-primary btn-block"
              href=""
              onClick={this.logout.bind(this)}
            >
              LogOut
            </button>
          </div>
        </div>
      </React.Fragment>
    );
    return <div>{localStorage.usertoken ? userLink : loginLink}</div>;
  }
}

export default withRouter(Landing);
