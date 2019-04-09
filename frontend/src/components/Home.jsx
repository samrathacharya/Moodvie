import React, { Component } from "react";
import "./css/home.css";

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
    return (
      <div className="body">
        <div className="form-group ">
          <div className="searchterm display-middle">Moodvie</div>

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
          <div className="signup">
            <h4>
              <a href="/users/login">
                <span class="badge badge-pill badge-primary">Login?</span>
              </a>
              <a href="/users/register">
                <span class="badge badge-pill badge-warning">Sign Up!</span>
              </a>
            </h4>
          </div>

          <div className="footer">Copyright Moodvie 2019</div>
        </div>
      </div>
    );
  }
}
export default Home;
