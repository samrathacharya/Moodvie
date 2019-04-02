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

  handleChange = event => {
    //Turn Search to lower case
    var query = event.target.value.toLowerCase();
    console.log(query);
    //list of movies
    //Turn all titles to lower case
    console.log();
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
              <a href="/profile">Your Profile Page</a>
            </p>
          </div>
          <div className="profile">
            <div className="details" />
            <h4 className="welcome">
              <b>Your Watchlist:</b>
            </h4>
            <form onSubmit={this.searchList} className="test">
              <div>
                <input
                  className="searchForm"
                  id="searchterm"
                  type="text"
                  name="searchterm"
                  placeholder="Search For movie in watchlist"
                  onChange={this.handleChange}
                />
              </div>
            </form>
            <br />
            <br />
            {this.movieList}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Watchlist;
