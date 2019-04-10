import React, { Component } from "react";
import MovieBlock from "./MovieBlock";
import Search_bar from "./Search_bar";
import axios from "axios";
import Moodvie_icon from "./Moodvie_icon";
import Moodvie_result_icon from "./Moodive_result_icon";
import "./css/button.css";
import "./css/result.css";
import SearchAppBar from "./NavBarTop.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
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
    if (e.target.searchterm == undefined) {
      this.props.history.push("/search/");
      console.log(e.target);
    } else {
      const term = e.target.searchterm.value;
      this.setState({ term });
      this.props.history.push("/search/" + e.target.searchterm.value);
    }
  };

  renderMovieBlocks() {
    if (this.state.blocks.length === 0)
      return (
        <div>
          <h3>Sorry,there is no result related for {this.state.term}</h3>
          <h4>Please try again</h4>
        </div>
      );
    return (
      <React.Fragment>
        {this.state.blocks.map(block => (
          <MovieBlock
            key={block.id}
            title={block.title}
            id={block.id}
            date={block.date}
            imageUrl={block.poster_link}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Paper style={{ padding: 40, marginTop: 40, marginBottom: 10 }}>
            <Grid item>
              <SearchAppBar />
            </Grid>
            <Grid>
              <Typography
                component="h3"
                variant="display1"
                gutterBottom
                style={{ padding: 5, marginTop: 5, marginBottom: 10 }}
              >
                Showing results for "{this.props.match.params.term}"{" "}
              </Typography>
            </Grid>
            <Grid>{this.renderMovieBlocks()}</Grid>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default MovieResult;
