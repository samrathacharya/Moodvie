import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "../components/css/userProfile.css";
import userImage from "../assets/user.jpg";

class UserProfile extends Component {
  // TODO: Save image in user state
  state = {
    name: "Sam",
    email: "samlikesjam@gmail.com",
    movies: [
      { title: "Avengers Infinity War" },
      { title: "Batman Returns" },
      { title: "Get Out" },
      { title: "Wolf Of Wall Street" },
      { title: "Ace Ventura" }
    ]
  };

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
            <h2 className="welcome">Welcome Sam!</h2>
            <div className="profileImageDiv">
              <img className="profileImage" src={userImage} />
            </div>
            <div className="details">
              <h4>Name: {this.state.name}</h4>
              <h4>Email: {this.state.email}</h4>
              <h4>Watch Later: {this.state.movies.length}</h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
