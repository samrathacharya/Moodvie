import React, { Component } from "react";
import './home.css';

class Home extends Component {
  state = {};
  search_term = React.createRef();
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/search/" + e.target.searchterm.value);
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
              className="form-control display-middle"
              name="searchterm"
              placeholder="What do you want to watch today?"
            />
            <button className="btn btn-danger display-middle">Search</button>
          </form>
          <div className="footer">Copyright Moodvie 2019</div>
        </div>
      </div>
    );
  }
}
export default Home;
