import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import "../components/css/userProfile.css";

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  //Change Name
  changeName(event) {
    //prevent re-render
    event.preventDefault();
    //Grab newName from the form
    let newName = this.refs.name.value;
    this.setState({
      name: newName
    });
    this.refs.name.value = "";
  }

  changeEmail(event) {
    //prevent re-render
    event.preventDefault();
    //Grab newEmail from the form
    let newEmail = this.refs.email.value;
    this.setState({
      email: newEmail
    });
    this.refs.email.value = "";
  }

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
              <form onSubmit={this.changeName.bind(this)}>
                <div>
                  <input type="text" ref="name" placeholder="Enter new name" />
                  <div className="searchbtn">
                    <button>Change</button>
                  </div>
                </div>
              </form>
              <br />
              <span className="detailField">
                <b>Change email:</b>
              </span>
              <form onSubmit={this.changeEmail.bind(this)}>
                <div>
                  <input
                    ref="email"
                    type="text"
                    placeholder="Enter new email"
                  />
                  <div className="searchbtn">
                    <button>Change</button>
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
