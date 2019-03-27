import React, { Component } from "react";
import Search_bar from "./Search_bar";
import axios from "axios";
class MovieDetails extends Component {
  state = {
    id: this.props.id,
    title: "American god",
    posterLink: "http://picsum.photos/200",
    year: "1998",
    casts: "Emily Clark",
    by: "Jame brown",
    restriction: "PG-13",
    summary: "a movie",
    trailors: [],

    rating: []
  };

  async componentDidMount() {
    const promise = axios.get(
      "http://127.0.0.1:4897/result_id=" + this.props.match.params.id
    );
    const reponse = await promise;
  }
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.id}</h1>;
      </React.Fragment>
    );
  }
}

export default MovieDetails;
