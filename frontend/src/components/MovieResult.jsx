import React, { Component } from "react";
import MovieBlock from "./MovieBlock";
import Search_bar from "./Search_bar";
import axios from "axios";
import Moodvie_icon from "./Moodvie_icon";
import Moodvie_result_icon from "./Moodive_result_icon";

import "./result.css";

const textBoxStyle = {
  width: "400px"
};

const iconMargin = {
  marginLeft: "10px"
};

class MovieResult extends Component {
  state = {
    term: "",
    blocks: []
  };

  search_term = React.createRef();
  async componentDidMount() {
    //communicate to backend
    const promise = axios.get(
      "http://127.0.0.1:4897/search/term=" + this.props.match.params.term
    );
    const reponse = await promise;
    //set the keyword to show
    const term = reponse.data.keyword;
    this.setState({ term });

    //set the result movie blocks
    const blocks = [];
    this.setState({ blocks });
    const result = reponse.data.movies;
    for (let key in result) {
      let ob = {};
      ob = Object.assign(ob, result[key]);
      blocks.push(ob);
    }

    this.setState({ blocks });
  }
  handleSubmit = e => {
    const term = e.target.searchterm.value;
    this.setState({ term });
    this.props.history.push("/search/" + e.target.searchterm.value);
  };

  renderMovieBlocks() {
    if (this.state.blocks.length === 0)
      return <h3>There is no result related to {this.state.term}</h3>;
    return (
      <React.Fragment>
        <div className="headerContainer">
          <Moodvie_result_icon />
          <div className="searchAndButton">
            <form onSubmit={this.handleSubmit}>
              <input
                id="searchterm"
                ref={this.search_term}
                type="text"
                className="i-told-before-2"
                style={textBoxStyle}
                name="searchterm"
                placeholder="What do you want to watch today?"
              />
            </form>
          </div>
          <button id="searchButton" onClick={this.handleSubmit}>
            Search
          </button>
        </div>

        <div className="i-told-you-before">
          <div className="resultsfor">
            <b>Showing results for "{this.props.match.params.term}" </b>
          </div>

          {this.state.blocks.map(block => (
            <div className="movieBlock">
              <MovieBlock
                key={block.id}
                title={block.title}
                id={block.id}
                date={block.date}
                imageUrl={block.poster_link}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.renderMovieBlocks()}</React.Fragment>;
  }
}

export default MovieResult;
