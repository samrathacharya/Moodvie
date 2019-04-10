import React, { Component } from "react";
import "./css/home.css";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Input,
  FormControl,
  Button,
  Grid,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    width: "40%",
    position: "absolute",
    top: "50%",
    left: "30%"
  },
  input: {
    height: "1.6cm",
    "font-size": "1.0cm",
    padding: "1px"
  },
  iconButton: {
    position: "absolute",
    top: "51%",
    left: "66%"
  }
};
class Home extends Component {
  state = {};
  search_term = React.createRef();
  handleSubmit = e => {
    if (e.target.searchterm == undefined) {
      this.props.history.push("/search/");
    } else {
      e.preventDefault();
      this.props.history.push("/search/" + e.target.searchterm.value);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className="searchterm display-middle">Moodvie</div>
        <Grid>
          <form onSubmit={this.handleSubmit}>
            <Paper classes={{ root: classes.root }}>
              <Input
                fullWidth="true"
                margin="dense"
                classes={{ root: classes.input }}
              />
            </Paper>

            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Home);
/*
<form onSubmit={this.handleSubmit}>
          <input
            id="searchterm"
            ref={this.search_term}
            type="text"
            className="form-control "
            name="searchterm"
            placeholder="What do you want to watch today?"
          />
          <button className="btn btn-danger ">Search</button>
        </form>

        <a href="/users/login">
          <span class="badge badge-pill badge-primary">Login?</span>
        </a>
        <a href="/users/register">
          <span class="badge badge-pill badge-warning">Sign Up!</span>
        </a>*/
/*
<TextField
            id="filled-full-width"
            style={{ margin: 8 }}
            placeholder="Movie"
            helperText="What do you want to watch today?"
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
          />
*/
