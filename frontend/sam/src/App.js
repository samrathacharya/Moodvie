import React, { Component } from "react";
import "./App.css";
import MovieRow from "./components/MovieRow";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const movies = [];
    this.state = {
      rows: <p>Rows</p>
    };
    var movieRows = [];

    //Rendering each movie
    movies.forEach(movie => {
      //Passing in movie as an argument
      const movieRow = <MovieRow movie={movie} />;
      //Pushes formatting for an individual movie onto the movieRows array
      movieRows.push(movieRow);

      //Method that performs search using the API
      this.performSearch();
    });

    //this.state.rows = this.state.movieRows. this.state.rows is called later on in the program so it prints it on to the console
    this.state = { rows: movieRows };
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("Fetched data successfully");
        // console.log(searchResults)
        const results = searchResults.results;
        console.log(results[0]);

        var movieRows = [];
        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  render() {
    return (
      <React.Fragment className="App">
        {/*className = style  */}
        <table className="title">
          <tbody>
            <tr>
              <td>
                <img alt="Moodive icon" width="40" src="moodvie.ico" />
              </td>
              <td width="10"> </td>
              <td width>
                <h1>Moodvie</h1>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Add event handler */}
        <input
          onChange={this.searchChangeHandler.bind(this)}
          className="searchBox"
          placeholder="Enter search term"
        />

        {this.state.rows}
      </React.Fragment>
    );
  }
}

export default App;
