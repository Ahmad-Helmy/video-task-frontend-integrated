import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      // _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: getGenres(),
    errors: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const movie = getMovie(id);
      if (!movie) return this.props.history.replace("/not-found");
      const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
      const data = { ...this.state.data };
      data._id = _id;
      data.title = title;
      data.genreId = genre._id;
      data.numberInStock = numberInStock;
      data.dailyRentalRate = dailyRentalRate;
      this.setState({ data });
    }
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
  };

  doSubmit = () => {
    const movie = { ...this.state.data };

    console.log(saveMovie(movie));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate")}
        {this.renderButton("submit")}
      </form>
    );
  }
}

export default MovieForm;
