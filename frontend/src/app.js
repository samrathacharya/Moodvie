import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home";
import MovieResult from "./components/MovieResult";
import MovieDetails from "./components/MovieDetails";

import NotFound from "./components/NotFound";
class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Redirect from="/search" exact to="/home" />
          <Route path="/search/:term" component={MovieResult} />
          <Route path="/moviedetails/:name/:yr" component={MovieDetails} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}
//

//
export default App;
