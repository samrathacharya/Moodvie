import React, { Component } from "react";
import axios from "axios";
class Platform extends Component {
  state = {
    loading_link: this.props.loading_link,
    name: this.props.name
  };
  async componentDidMount() {
    const promise = axios.get(this.state.loading_link);
    const reponse = await promise;
    console.log(reponse.data);
  }
  render() {
    return <span class="badge badge-warning">{this.state.name}</span>;
  }
}

export default Platform;
