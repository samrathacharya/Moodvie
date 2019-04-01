import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "../components/css/userProfile.css";

class ChangeProfile extends Component {
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
              <a href="/user"> Your User Page </a>
            </p>
            <p>
              <a href="/watchlist">Your Watchlist</a>
            </p>
          </div>
          <div className="profile">
            <div className="details">
              <h4>Change name: {this.state.name}</h4>
              <h4>Change mail: {this.state.email}</h4>
              <h4>Change image: ...</h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangeProfile;
