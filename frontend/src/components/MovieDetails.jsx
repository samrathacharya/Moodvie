import React, { Component } from "react";
import Search_bar from "./Search_bar";
import axios from "axios";
import Moodvie_icon from "./Moodvie_icon";
class MovieDetails extends Component {
  state = {
    id: this.props.id,
    title: "American god",
    posterLink: "http://picsum.photos/200",
    date: "1998",
    casts: [],
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
    const data = reponse.data;
    const summary = data.synopsis;
    this.setState({
      title: data.title,
      posterLink: data.poster_link,
      summary: data.synopsis,
      date: data.date,
      casts: data.casts
    });
    console.log(data);
  }

  castList() {
    this.state.casts.map(actor => {
      return <span class="badge badge-pill badge-primary">{actor}</span>;
    });
  }
  render() {
    return (
      <React.Fragment>
        <Moodvie_icon />
        <h1>{this.state.title}</h1>;<img src={this.state.posterLink} />
        <h3>{this.state.summary}</h3>
        {this.state.casts.map(actor => {
          return <span class="badge badge-pill badge-success">{actor}</span>;
        })}
      </React.Fragment>
    );
  }
}

export default MovieDetails;
