import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="row mb-2">
        <span className={this.getBadgeClasses()}>{this.formaCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="col-1 btn btn-secondary btn-sm mr-2"
        >
          +
        </button>
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          disabled={this.props.counter.value === 0}
          className="col-1 btn btn-secondary btn-sm mr-2"
        >
          -
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="col-1 btn btn-danger btn-sm mr-2"
        >
          x
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "col-1 badge m-2 ";
    classes +=
      this.props.counter.value === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formaCount() {
    return this.props.counter.value === 0 ? "Zero" : this.props.counter.value;
  }
}

export default Counter;
