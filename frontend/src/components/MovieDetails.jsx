import React, { Component } from "react";
import Search_bar from "./Search_bar";
class MovieDetails extends Component {
  state = {
    id: this.props.match.params.id,
    title: "American god",
    posterLink: "http://picsum.photos/200",
    year: "1998",
    casts: "Emily Clark",
    by: "Jame brown",
    restriction: "PG-13",
    summary: "a movie",
    trailors: [
      {
        posterLink: "https://i.ytimg.com/vi/TcMBFSGVi1c/hqdefault.jpg",
        link: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      }
    ],

    rating: [
      {
        website: "IMDB",
        rating: 7.8
      },
      {
        website: "Rt",
        rating: 70
      }
    ]
  };
  render() {
    return (
      <React.Fragment>
        <Search_bar />
        <h1>{this.props.match.params.name}</h1>;
        <h1>{this.props.match.params.yr}</h1>;
      </React.Fragment>
    );
  }
}

export default MovieDetails;
