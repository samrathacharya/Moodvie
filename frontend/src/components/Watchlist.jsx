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
    ],
    search: ""
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    //Search for movies function
    let filteredMovies = this.state.movies.filter(movie => {
      return (
        movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    //Render movies
    this.movieList = filteredMovies.map(movie => (
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

            <input
              className="searchForm"
              type="text"
              value={this.state.search}
              placeholder="Search For movie in watchlist"
              onChange={this.updateSearch.bind(this)}
            />
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

// handleChange = event => {
//   //Turn Search to lower case
//   var query = event.target.value.toLowerCase();
//   console.log(query);
//   //list of movies
//   //Turn all titles to lower case
//   console.log();
// };
