import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/movieblock.css";

class MovieBlock extends Component {
  state = {
    id: this.props.title + this.props.date,
    title: this.props.title,
    imageUrl: this.props.imageUrl,
    date: this.props.date,
    currnt: 2020,

    movie_page: "/moviedetails/" + this.props.id
  };

  title_color() {
    if (this.state.date < this.state.currnt) return "alert alert-dark";
    return "alert alert-warning";
  }

  availalble() {
    if (this.state.date < this.state.currnt) return "available";
    return "upcoming";
  }
  GoMoviePage() {}
  render() {
    return (
      <React.Fragment>
        <div className="big-body">
          <div className="box">
            <div className="image">
              <img
                src={this.state.imageUrl}
                alt={this.state.title}
                width="180"
                height="270"
              />
            </div>
            <div className="card-body">
              <a href={this.state.movie_page}>
                {this.state.title}({this.state.date})
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
/*


  <h4 className={this.title_color()}>
          {this.state.title} - {this.availalble()}
        </h4>
        <img src={this.state.imageUrl} alt={this.state.title} />
        <Link to={this.state.movie_page}>{this.state.date}</Link>

        
        <div class="card" style="width: 18rem;">
          <img
            src={this.state.imageUrl}
            class="card-img-top"
            alt={this.state.title}
          />
          <div class="card-body">
            <h5 class="card-title">{this.state.title}</h5>
            <p class="card-text">{this.state.date}</p>
            <a href={this.state.movie_page} class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

*/

export default MovieBlock;
