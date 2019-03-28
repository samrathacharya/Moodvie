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
    rated: "",
    rating: { imdb: "Not available", mt: "Not available", rt: "Not available" },
    platforms: [],
    runtime: "",
    trailor: {
      link: "N/A",
      pic: "N/A"
    }
  };

  async componentDidMount() {
    // update the console info
    const promise = axios.get(
      "http://127.0.0.1:4897/result_id=" + this.props.match.params.id
    );
    const reponse = await promise;
    const data = reponse.data;
    let rating = {
      imdb: "Not available",
      mt: "Not available",
      rt: "Not available"
    };

    this.setState({
      title: data.title,
      posterLink: data.poster_link,
      summary: data.synopsis,
      date: data.date,
      casts: data.casts,
      by: data.director,
      rated: data.AgeRestriction,
      runtime: data.runtime,
      rating: rating
    });

    let tmp = new Date(this.state.date);
    const promise2 = axios.get(
      "http://127.0.0.1:4897/trailor/title=" +
        data.title +
        "&date=" +
        tmp.getFullYear()
    );
    const reponse2 = await promise2;
    const trailor = reponse2.data;
    this.setState({ trailor: trailor });

    rating.imdb = data.ratings.imdb;
    rating.rt = data.ratings.rt;
    rating.mt = data.ratings.mt;
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
    return (
      <div>
        <h4>cast:</h4>
        {this.state.casts.map(actor => {
          return (
            //link to the wiki page of the actor
            <a href={"https://en.wikipedia.org/wiki/" + actor}>
              <span className="badge badge-pill badge-success" key={actor}>
                {actor}
              </span>
            </a>
          );
        })}
      </div>
    );
  }
  platformsList() {
    return (
      <div>
        <h4>platforms</h4>
        {this.state.platforms}
      </div>
    );
  }
  ratingList() {
    return (
      <div>
        <h4>imdb-{this.state.rating.imdb}</h4>
        <h4>rt-{this.state.rating.rt}</h4>
        <h4>mt-{this.state.rating.mt}</h4>
      </div>
    );
  }

  trailor() {
    return (
      <div>
        <h1>trailors:</h1>
        <a href={this.state.trailor.link}>
          <img src={this.state.trailor.pic} alt="Not available" />
        </a>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Moodvie_icon />
        <h1>{this.state.title}</h1>;<img src={this.state.posterLink} />
        <div className="wiki_logo">
          <a href={"https://en.wikipedia.org/wiki/" + this.state.title}>
            <img src={require("./icon/wiki.png")} />
          </a>
        </div>
        <h3>{this.state.summary}</h3>
        <h4>{this.state.date}</h4>
        <h4>{this.state.runtime}</h4>
        <h4>{this.state.by}</h4>
        <h4>{this.state.rated}</h4>
        {this.ratingList()}
        {this.castList()}
        {this.platformsList()}
        {this.trailor()}
      </React.Fragment>
    );
  }
}

export default MovieDetails;
