import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieBlock extends Component {
  state = {
    id: this.props.title + this.props.date,
    title: this.props.title,
    imageUrl: "http://picsum.photos/200",
    date: this.props.date,
    currnt: 2020,

    movie_page: "/moviedetails/" + this.props.title + this.props.date
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
        {this.props.children}
        <h1 className={this.title_color()}>
          {this.state.title} - {this.availalble()}
        </h1>
        <img src={this.state.imageUrl} alt={this.state.title} />
        <Link to={this.state.movie_page}>{this.state.date}</Link>
      </React.Fragment>
    );
  }
}

export default MovieBlock;
