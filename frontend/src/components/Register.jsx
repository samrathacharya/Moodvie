import React, { Component } from "react";
import { register } from "./UserFunctions";
import SearchAppBar from "./NavBarTop.jsx";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Mail from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import "./css/Regist.css";
import { Typography, Button } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
class Register extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let validation = this.validation();
    if (validation === 0) {
      let newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      register(newUser).then(res => {
        console.log(res);
        if (res.data.result === "success") {
          this.props.history.push("/home");
        }
      });
    } else if (validation === 1) {
      alert("Passwords don't match");
    } else if (validation === 2) {
      alert("Passwords need be between 6 and 20 characters");
    } else if (validation === 3) {
      alert("Please enter a valid email address");
    }
  }

  // 0 = good
  // 1 = passwords don't match
  // 2 = password length error
  // 3 = invalid email
  //4 = user exists
  validation() {
    const exp = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (this.state.password !== this.state.confirmPassword) {
      return 1;
    } else if (this.state.password.length <= 6 || this.state.password > 20) {
      return 2;
    } else if (!exp.test(String(this.state.email).toLowerCase())) {
      return 3;
    } else {
      return 0;
    }

    //
  }

  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Paper
            style={{
              padding: 50,
              marginTop: 20,
              marginBottom: 10,
              position: "absolute",
              top: "15%",
              left: "40%"
            }}
          >
            <Grid item>
              <SearchAppBar />
            </Grid>
            <Grid>
              <form onSubmit={this.onSubmit}>
                <Typography component="h3" variant="display1" gutterBottom>
                  Sign Up <AccountCircle />
                </Typography>

                <div className="regist_row">
                  <Grid
                    container
                    spacing={8}
                    alignItems="flex-end"
                    id="input-with-icon-grid"
                    type="text"
                    label="username"
                    value={this.state.username}
                    onChange={this.handleChange("username")}
                  >
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="Username" />
                    </Grid>
                  </Grid>
                </div>
                <div className="regist_row">
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        type={this.state.showPassword ? "text" : "password"}
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>

                <div className="regist_row">
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        type={this.state.showPassword ? "text" : "password"}
                        label="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange("confirmPassword")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>

                <div className="regist_row">
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        label="Email"
                        id="input-with-icon-grid"
                        label="Email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="regist_row">
                  <Button type="submit" variant="contained" color="secondary">
                    CONFIRM
                  </Button>
                </div>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Register;

/*

<form onSubmit={this.onSubmit} methods="POST">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <br />

                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.Email}
                  onChange={this.onChange}
                />
                <br />

                <input
                  type="text"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <br />

                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Register
                </button>
              </form>
*/
