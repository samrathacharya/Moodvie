import React, { Component } from "react";

class MovieRow extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* Reference the movie argument passed in */}
        <table key={this.props.movie.id}>
          <tbody>
            <tr>
              <td>
                <h4>Poster</h4>
              </td>
              <td>
                <h4>General Info</h4>
              </td>
              <td>
                <h4>Price</h4>
              </td>
              <td>
                <h4>Platforms:</h4>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  alt="poster"
                  width="100"
                  src={this.props.movie.poster_src}
                />
              </td>
              <td>
                <h3>{this.props.movie.title}</h3>
                <p>
                  <b>Synopsis: </b>
                  {this.props.movie.overview}
                </p>
                <p>
                  <b>Cast:</b> {this.props.movie.cast}
                </p>
              </td>
              <td>{this.props.movie.price}</td>
              {/* <td>
                {this.props.movie.platforms.map((platforms, i) => {
                  return <p>{platforms}</p>;
                })}
              </td> */}
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default MovieRow;
