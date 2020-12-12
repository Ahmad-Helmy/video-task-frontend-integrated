import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Dropdown from "./dopdown";
import { Link } from "react-router-dom";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const val = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!val.error) return null;
    console.log(val.error.details);
    const errors = {};
    val.error.details.map(err => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : "";
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[input.name] = input.value;
    errors[input.name] = this.validateProperty(input);
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors ? errors : {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton = label => {
    return <button className="btn btn-primary">{label}</button>;
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, data) => {
    const { errors } = this.state;
    return (
      <Dropdown
        name={name}
        data={data}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
