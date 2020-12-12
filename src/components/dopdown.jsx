import React from "react";

const Dropdown = ({ label, data, ...rest }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-control" {...rest}>
        {data.map(d => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
