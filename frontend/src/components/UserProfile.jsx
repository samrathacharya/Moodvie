import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "../components/css/userProfile.css";
import userImage from "../assets/user.jpg";
import jwt_decode from "jwt-decode";

class UserProfile extends Component {
  // TODO: Save image in user state
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      movies: []
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      name: decoded.identity.name,
      email: decoded.identity.email,
      movies: decoded.identity.movies
    });
  }

  render() {
    const textBoxStyle = {
      width: "400px"
    };

    const iconMargin = {
      marginLeft: "10px"
    };
    return (
      <React.Fragment>
        {/* Include navbar component */}
        <div className="headerContainer">
          <Moodvie_result_icon />
        </div>

        {/* User Profile */}
        <div className="bottom">
          <div className="navigation">
            <h2>Navigation</h2>
            <br />
            <p>
              <a href="/profile"> Your Profile </a>
            </p>
            <p>
              <a href="/watchlist">Your Watchlist</a>
            </p>
          </div>
          <div className="profile">
            <h2 className="welcome">
              {" "}
              <b>Welcome Sam!</b>
            </h2>
            <div className="profileImageDiv">
              <img className="profileImage" src={userImage} />
            </div>
            <div className="details">
              <span className="detailField">
                {" "}
                <b>Name:</b>
              </span>
              {this.state.name} <br />
              <span className="detailField">
                <b>Email:</b>
              </span>
              {this.state.email} <br />
              <span className="detailField">
                <b>Watch Later: </b>
              </span>
              {this.state.movies.length} <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
