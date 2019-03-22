import React, { Component } from "react";
import MovieBlock from "./MovieBlock";
import Search_bar from "./Search_bar";
class MovieResult extends Component {
  state = {
    term: "asas",
    blocks: [
      { id: 1, title: 0, date: 2000 },
      { id: 2, title: 1, date: 2000 },
      { id: 3, title: 2, date: 2000 },
      { id: 4, title: 3, date: 2000 }
    ]
  };

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
