import React from "react";

import Joi from "joi-browser";
import Form from "./form";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5),
    name: Joi.string().required()
  };

  doSubmit = () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="mt-3">
          <h1>Register</h1>
          {this.renderInput("username", "Usernaem")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("login")}
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
