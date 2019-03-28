import React, { Component } from "react";
import Search_bar from "./Search_bar";
import axios from "axios";
import Moodvie_icon from "./Moodvie_icon";
import Platform from "./Platform";

class MovieDetails extends Component {
  state = {
    title: "American god",
    posterLink: "http://picsum.photos/200",
    date: "3000",
    casts: [],
    by: "Jame brown",
    summary: "a movie",
    rating: [],
    platforms: []
  };

  async componentDidMount() {
    // update the console info
    const promise = axios.get(
      "http://127.0.0.1:4897/result_id=" + this.props.match.params.id
    );
    const reponse = await promise;
    const data = reponse.data;
    this.setState({
      title: data.title,
      posterLink: data.poster_link,
      summary: data.synopsis,
      date: data.date,
      casts: data.casts
    });

    let platforms = [];

    //push the platforms

    //itunes
    platforms.push(
      <Platform
        key={"itunes"}
        loading_link={
          "http://localhost:4897/platforms/itunes/title=" +
          '"' +
          this.state.title +
          '"' +
          "&date=" +
          this.state.date
        }
        name={"itunes"}
        icon_root="./icon/itunes.png"
      />
    );

    //google play

    platforms.push(
      <Platform
        key={"google play"}
        loading_link={
          "http://localhost:4897/platforms/google_play/title=" +
          '"' +
          this.state.title +
          '"' +
          "&date=" +
          this.state.date
        }
        name={"google play"}
        icon_root="./icon/itunes.png"
      />
    );

    //youtube

    let tmp = new Date(this.state.date);

    let title_new = this.state.title.replace(" ", "_");

    platforms.push(
      <Platform
        key={"youtube"}
        loading_link={
          "http://localhost:4897/platforms/youtube/title=" +
          title_new +
          "&date=" +
          tmp.getFullYear()
        }
        name={"youtube"}
        icon_root="./icon/itunes.png"
      />
    );
    // set the state
    this.setState({ platforms: platforms });
  }
  constructor() {
    super();
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
        <h4>{this.state.date}</h4>
        {this.state.casts.map(actor => {
          return (
            <span className="badge badge-pill badge-success" key={actor}>
              {actor}
            </span>
          );
        })}
        {this.state.platforms}
      </React.Fragment>
    );
  }
}

export default MovieDetails;
