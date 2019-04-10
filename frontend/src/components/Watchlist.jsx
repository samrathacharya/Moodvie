import React, { Component } from "react";
import Moodvie_result_icon from "./Moodive_result_icon";
import Navbar from "./navbar";

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
  badge() {
    let ran = Math.floor(Math.random() * Math.floor(5));
    let prim = "primary";
    switch (ran) {
      case 0:
        prim = "primary";
        break;
      case 1:
        prim = "secondary";
        break;
      case 2:
        prim = "success";
        break;
      case 3:
        prim = "dark";
        break;
      case 4:
        prim = "warning";
        break;
      case 5:
        prim = "info";
        break;
    }
    return "badge badge-" + prim;
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
      <a href="http://localhost:3000/moviedetails/tt4154756">
        <h4 key={movie.key}>
          <span class={this.badge()}>{movie.title}</span>
        </h4>
      </a>
    ));
    return (
      <React.Fragment>
        {/* Include navbar component */}
        <div className="headerContainer">
          <Navbar />
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
