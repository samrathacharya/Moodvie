import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home";
import MovieResult from "./components/MovieResult";
import MovieDetails from "./components/MovieDetails";
import UserProfile from "./components/UserProfile";
import Watchlist from "./components/Watchlist";
import ChangeProfile from "./components/ChangeProfile";

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
          <Route path="/moviedetails/:id" component={MovieDetails} />
          <Route path="/user" component={UserProfile} />
          <Route path="/user/watchlist" component={Watchlist} />
          <Route path="/user/profile" component={ChangeProfile} />
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
