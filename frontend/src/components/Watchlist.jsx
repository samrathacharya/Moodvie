import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";

class Watchlist extends Component {
  state = {
    movies: [
      { key: 1, title: "Avengers Infinity War" },
      { key: 2, title: "Batman Returns" },
      { key: 3, title: "Get Out" },
      { key: 4, title: "Wolf Of Wall Street" },
      { key: 5, title: "Ace Ventura" }
    ]
  };

  render() {
    this.movieList = this.state.movies.map(movie => (
      <li key={movie.key}>{movie.title}</li>
    ));
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
            <div className="details" />
            <h4 className="welcome">Your Watchlist:</h4>
            {this.movieList}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Watchlist;
