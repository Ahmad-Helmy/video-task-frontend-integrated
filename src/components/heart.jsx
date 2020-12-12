import React, { Component } from "react";

class Heart extends Component {
  state = {};

  classes = () => {
    let classes = "fa fa-heart";
    if (!this.props.movie.liked) classes += "-o";
    return classes;
  };

  render() {
    return (
      <React.Fragment>
        <i
          onClick={() => this.props.onLike(this.props.movie)}
          style={{ cursor: "pointer" }}
          className={this.classes()}
        ></i>
      </React.Fragment>
    );
  }
}

export default Heart;
