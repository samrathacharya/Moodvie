import React, { Component } from "react";
import Search_bar from "./Search_bar";
import axios from "axios";
import Moodvie_icon from "./Moodvie_icon";
import Platform from "./Platform";
import Moodvie_result_icon from "./Moodive_result_icon";
import "./css/movie_detail.css";
import "./css/badge.css";
import "./css/button.css";

import SpinnerPage from "./Spinner";
const textBoxStyle = {
  width: "400px"
};

const iconMargin = {
  marginLeft: "10px"
};

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "American god",
      posterLink: "http://picsum.photos/200",
      date: "3000",
      casts: [],
      by: "Jame brown",
      summary: "a movie",
      rated: "",
      rating: {
        imdb: "Not available",
        mt: "Not available",
        rt: "Not available"
      },
      platforms: [],
      runtime: "",
      trailor: <SpinnerPage />
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    // update the console info
    const promise = axios.get("http://127.0.0.1:4897/result_id=" + id);
    const reponse = await promise;
    const data = reponse.data;
    let rating = {
      imdb: "Not available",
      mt: "Not available",
      rt: "Not available"
    };

    //Pass in data to backend
    console.log(id);
    console.log(data.title);
    console.log();

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

    //set youtube
    //youtube trailor
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
    console.log(this.state.date);
    platforms.push(
      <Platform
        key={"youtube"}
        loading_link={
          "http://localhost:4897/platforms/youtube/title=" +
          title_new +
          "&date=" +
          this.state.date
          //tmp.getFullYear()
        }
        name={"youtube"}
        icon_root="./icon/itunes.png"
      />
    );
    // set the state
    this.setState({ platforms: platforms });
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
    return "badge badge-pill badge-" + prim;
  }

  castList() {
    return (
      <React.Fragment>
        <div className="cast">
          {this.state.casts.map(actor => {
            return (
              //link to the wiki page of the actor

              <a
                target="_blank"
                href={"https://en.wikipedia.org/wiki/" + actor}
              >
                <span className={this.badge()} key={actor}>
                  <div>{actor}</div>
                </span>
              </a>
            );
          })}
          <span className="badge badge-danger">
            {" "}
            Rated - {this.state.rated}
          </span>
        </div>
      </React.Fragment>
    );
  }
  platformsList() {
    return (
      <div>
        <h4>Platforms</h4>
        {this.state.platforms}
      </div>
    );
  }
  ratingList() {
    let mt_string =
      "https://www.metacritic.com/movie/" +
      this.state.title.replace(" ", "-").toLowerCase();

    let rt_string =
      "https://www.rottentomatoes.com/search/?search=" + this.state.title;
    let imdb_string =
      "https://www.imdb.com/title/" + this.props.match.params.id;
    return (
      <div className="ratingList">
        <div className="ratingTitle">
          <h2>Popular Ratings</h2>
        </div>
        <div className="rating">
          <h4>
            <a
              target="_blank"
              href={imdb_string}
              className="sm-link sm-link_padding-bottom sm-link3"
            >
              <img
                className="reviewlogo"
                src={require("./icon/imdb.jpeg")}
                alt="rt"
              />
              <span className="sm-link__label">-{this.state.rating.imdb}</span>
            </a>
          </h4>
          <h4>
            <a
              target="_blank"
              href={rt_string}
              className="sm-link sm-link_padding-bottom sm-link3"
            >
              <img
                className="reviewlogo"
                src={require("./icon/rt.png")}
                alt="imdb"
              />
              <span className="sm-link__label">-{this.state.rating.rt}</span>
            </a>
          </h4>
          <h4>
            <a
              target="_blank"
              href={mt_string}
              className="sm-link sm-link_padding-bottom sm-link3"
            >
              <img
                className="reviewlogo"
                src={require("./icon/mt.png")}
                alt="mt"
              />
              <span className="sm-link__label">-{this.state.rating.mt}</span>
            </a>
          </h4>
        </div>
      </div>
    );
  }

  trailor() {
    return (
      <div className="trailor">
        <h4>
          Trailer
          <a
            target="_blank"
            href={
              "https://www.youtube.com/results?search_query=" +
              this.state.title +
              " " +
              this.state.date
            }
          >
            <img
              className="link_img"
              src={require("./icon/play.png")}
              float="left"
            />
          </a>
        </h4>
        <a target="_blank" href={this.state.trailor.link}>
          <img
            className="trailerImg"
            src={this.state.trailor.pic}
            alt="Not available"
          />
        </a>
      </div>
    );
  }
  handleSubmit = e => {
    console.log("1");
    const term = e.target.searchterm.value;
    this.setState({ term });
    this.props.history.push("/search/" + e.target.searchterm.value);
  };
  render() {
    return (
      <React.Fragment>
        <div className="headerContainer">
          <Moodvie_result_icon />
        </div>

        <div className="detail">
          <div className="rhs-card">
            <img src={this.state.posterLink} />
            {this.ratingList()}
          </div>
          <div className="info">
            <div className="title">
              <p>
                {this.state.title}
                <a
                  target="_blank"
                  href={"https://en.wikipedia.org/wiki/" + this.state.title}
                >
                  <img
                    className="logo_img"
                    src={require("./icon/wiki.png")}
                    float="left"
                  />
                </a>
              </p>
            </div>

            <h4>
              {this.state.date} ({this.state.runtime}) By {this.state.by}
            </h4>
            {this.castList()}
            <div className="summary">
              <p>{this.state.summary}</p>
            </div>

            {this.platformsList()}
            {this.trailor()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
