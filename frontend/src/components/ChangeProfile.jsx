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

  componentDidMount() {
    this.setState({ name: this.state.name });
  }

  handleChangeName = e => {
    const term = e.target.searchterm.value;
    this.setState({ name: term });
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
            <h2 className="welcome">
              <b>Account Settings</b>
            </h2>
            <div className="details">
              <span className="detailField">
                <b>Name:</b>
              </span>
              {this.state.name} <br />
              <span className="detailField">
                <b>Email:</b>
              </span>
              {this.state.email} <br />
              <span className="detailField">
                <b>Change Name:</b>
              </span>
              <form onSubmit={this.handleChangeName}>
                <div>
                  <input
                    id="searchterm"
                    ref={this.state.name}
                    type="text"
                    name="searchterm"
                  />
                  <div className="searchbtn">
                    <button onClick={this.handleChangeName}>Change</button>
                  </div>
                </div>
              </form>
              <br />
              <span className="detailField">
                <b>Change email:</b>
              </span>
              <form onSubmit={this.handleChangeName}>
                <div>
                  <input
                    id="searchterm"
                    ref={this.state.name}
                    type="text"
                    name="searchterm"
                  />
                  <div className="searchbtn">
                    <button onClick={this.handleChangeName}>Change</button>
                  </div>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangeProfile;
