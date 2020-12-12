import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  render() {
    const {
      onReset,
      onDelete,
      onIncrement,
      onDecrement,
      counters
    } = this.props;
    return (
      <React.Fragment>
        <button onClick={onReset} className="btn btn-primary m-2">
          Reset
        </button>
        <div className="container">
          {counters.map(c => (
            <Counter
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              key={c.id}
              counter={c}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Counters;
