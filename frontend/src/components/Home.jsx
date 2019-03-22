import React, { Component } from "react";
class Home extends Component {
  state = {};
  search_term = React.createRef();
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/search/" + e.target.searchterm.value);
  };
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="searchterm">Moodvie</label>
          <form onSubmit={this.handleSubmit}>
            <input
              id="searchterm"
              ref={this.search_term}
              type="text"
              className="form-control"
              name="searchterm"
              placeholder="What do you want to watch today?"
            />
            <button className="btn btn-danger">Search</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Home;
