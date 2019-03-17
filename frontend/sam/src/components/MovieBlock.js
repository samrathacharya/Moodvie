// for the movie block in the result page
import React, { Component } from "react";
import "./MovieBlock.css";

class MovieRow extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="movie_block">
          <h3 className="year">{this.props.date}</h3>
          <img
            className="poster"
            alt="poster_not_available"
            src={this.props.movie.poster_src}
          />
          <h3 className="title">{this.props.title}</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieRow;
