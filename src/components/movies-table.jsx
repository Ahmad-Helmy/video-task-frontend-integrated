import React, { Component } from "react";
import Heart from "./heart";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  raisSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  resnderSortIcon = path => {
    if (this.props.sortColumn.path !== path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    const { movies, onLike, onDelete } = this.props;

    return movies.length > 0 ? (
      <table className="table table-light">
        <thead>
          <tr>
            <th onClick={() => this.raisSort("title")}>
              Title{this.resnderSortIcon("title")}{" "}
            </th>
            <th onClick={() => this.raisSort("genre.name")}>
              Genre{this.resnderSortIcon("genre.name")}
            </th>
            <th onClick={() => this.raisSort("numberInStock")}>
              Stock{this.resnderSortIcon("numberInStock")}
            </th>
            <th onClick={() => this.raisSort("dailyRentalRate")}>
              Rate{this.resnderSortIcon("dailyRentalRate")}
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movie-form/${movie._id}`}>{movie.title}</Link>{" "}
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart movie={movie} onLike={onLike} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p></p>
    );
  }
}

export default MoviesTable;
