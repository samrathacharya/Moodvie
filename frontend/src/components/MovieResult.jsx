import React, { Component } from "react";
import MovieBlock from "./MovieBlock";
import Search_bar from "./Search_bar";
import axios from "axios";
class MovieResult extends Component {
  state = {
    term: "",
    blocks: []
  };
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
  renderMovieBlocks() {
    if (this.state.blocks.length === 0)
      return <h3>There is no result related to {this.state.term}</h3>;
    return (
      <React.Fragment>
        <Search_bar
          bar_text={this.props.match.params.term}
          pushFunction={this.props.history.push}
        />
        <h1>Result for {this.props.match.params.term}</h1>
        {this.state.blocks.map(block => (
          <MovieBlock
            key={block.id}
            title={block.title}
            id={block.id}
            date={block.date}
          >
            <h1>Moodvie</h1>
          </MovieBlock>
        ))}
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.renderMovieBlocks()}</React.Fragment>;
  }
}

export default MovieResult;
