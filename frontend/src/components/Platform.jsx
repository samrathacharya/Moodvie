import React, { Component } from "react";
import axios from "axios";
import SpinnerPage from "./Spinner";
import not_available from "./icon/not_available.png";
class Platform extends Component {
  state = {
    loading_link: this.props.loading_link,
    name: this.props.name,
    platform_block: <SpinnerPage />,
    icon_root: "none"
  };

  badge() {
    let ran = Math.floor(Math.random() * Math.floor(5));
    let prim = "primary";
    switch (ran) {
      case 0:
        prim = "primary";
        break;
      case 1:
        prim = "secondary";
        break;
      case 2:
        prim = "success";
        break;
      case 3:
        prim = "danger";
        break;
      case 4:
        prim = "warning";
        break;
      case 5:
        prim = "info";
        break;
    }
    return "badge badge-" + prim;
  }
  not_available() {
    return (
      <h5>
        <span className="badge badge-dark">
          {this.state.name + "-Not available:("}
        </span>
      </h5>
    );
  }

  available(price, link) {
    return (
      <h2>
        <a href={link}>
          <span className={this.badge()}>{this.state.name + "-" + price}</span>
        </a>
      </h2>
    );
  }
  async componentDidMount() {
    console.log(this.state.loading_link);
    const promise = axios.get(this.state.loading_link);
    const reponse = await promise;
    const data = reponse.data;

    if (data.link == "N/A") {
      this.setState({
        platform_block: this.not_available()
      });
    } else {
      this.setState({
        platform_block: this.available(data.price, data.link)
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="PlatformBlock">{this.state.platform_block}</div>
      </React.Fragment>
    );
  }
}

export default Platform;
