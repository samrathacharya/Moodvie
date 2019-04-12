import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withRouter, Redirect, Link } from "react-router-dom";
import history from "./history";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import jwt_decode from "jwt-decode";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { login } from "./UserFunctions";
import "./css/home.css";

const styles = {
  login_profile_button: {
    border: "0.5px solid pink",
    margin: "4px",
    "text-decoration": "none",
    font: "white"
  }
};
class Dialog_bar extends Component {
  state = {
    name: undefined,
    login: false,
    openLogin: false,
    openSignup: false,
    openProfile: false
  };
  componentDidMount() {
    if (localStorage.getItem("usertoken") !== null) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        name: decoded.identity.username,
        login: true
      });
    }
  }
  handleLogin = e => {
    console.log("hello")
    e.preventDefault();
    const user = {
      username: e.target.name.value,
      password: e.target.pw.value
    };
    login(user).then(res => {
      localStorage.setItem("usertoken", res.data.token);
      console.log(res);
      if (res.data.result === "success") {
        this.props.history.push("/user");
      }
    });
    this.setState({ openLogin: false, login: true });
  };
  handleLoginOpen = () => {
    this.setState({ openLogin: true });
  };
  handleLoginClose = () => {
    this.setState({ openLogin: false });
  };

  render() {
    const { classes } = this.props;
    let re;
    if (localStorage.getItem("usertoken") !== null) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      re = (
        <React.Fragment>
          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
          >
            <a
              target="_blank"
              href="http://localhost:3000/profile"
              style={{ textDecoration: "none" }}
            >
              Profile
            </a>
          </Button>
        </React.Fragment>
      );
    } else {
      re = (
        <React.Fragment>
          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
            onClick={this.handleLoginOpen}
          >
            Login?
          </Button>
          <Dialog
            open={this.state.openLogin}
            onClose={this.handleLoginClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <form noValidate onSubmit={this.handleLogin}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="UserName"
                  type="Text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="pw"
                  name="pw"
                  label="Password"
                  type="Text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary">
                  Login
                </Button>
                <Button onClick={this.handleLoginClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
          >
            <a
              target="_blank"
              href="http://localhost:3000/users/register"
              style={{ textDecoration: "none" }}
            >
              Sign Up!
            </a>
          </Button>
        </React.Fragment>
      );
    }
    return re;
  }
}

export default withStyles(styles)(Dialog_bar);

/*


if (localStorage.getItem("usertoken") !== null) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      re = (
        <React.Fragment>
          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
          >
            <a
              href="http://localhost:3000/profile"
              style={{ textDecoration: "none" }}
            >
              Profile
            </a>
          </Button>
        </React.Fragment>
      );
    } else {
      re = (
        <React.Fragment>
          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
          >
            Login?
          </Button>
          <Dialog
            open={this}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            color="inherit"
            classes={{ root: classes.login_profile_button }}
          >
            Signup!
          </Button>
        </React.Fragment>
      );
    }


*/