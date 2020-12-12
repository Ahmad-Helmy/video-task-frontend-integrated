import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import Genre from "./genre";
import MoviesTable from "./movies-table";
import _ from "lodash";
import { Link } from "react-router-dom";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    currentGenreId: "All",
    sortColumn: { path: "title", order: "asc" },
    search: ""
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(m => id !== m._id);
    this.setState({
      movies
    });
  };

  handlePaginationChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenreId: genre, currentPage: 1, search: "" });
  };

  handelSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleLikeClick = movie => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSearch = ({ currentTarget: input }) => {
    this.setState({
      search: input.value,
      currentPage: 1,
      currentGenreId: "All"
    });
  };

  render() {
    const {
      currentPage,
      search,
      pageSize,
      currentGenreId,
      sortColumn,
      movies: allMovies
    } = this.state;

    const filterd =
      currentGenreId === "All"
        ? allMovies
        : allMovies.filter(m => m.genre._id === currentGenreId);

    const searchFilter = allMovies.filter(m => {
      if (m.title.toLowerCase().startsWith(search.toLowerCase())) return m;
    });

    const sorted = _.orderBy(
      search ? searchFilter : filterd,
      [sortColumn.path],
      [sortColumn.order]
    );
    console.log(sorted);

    const movies = sorted.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return (
      <React.Fragment>
        <div className="row mt-4">
          <div className="col-4">
            <Genre
              currentGenre={this.state.currentGenreId}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col-8">
            <Link to="/movie-form" className="btn btn-primary mb-2">
              new movie
            </Link>
            <p> showing {filterd.length} in the database</p>
            <input
              value={search}
              onChange={this.handleSearch}
              className="form-control"
              placeholder="search"
              type="text"
            />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLikeClick}
              onDelete={this.handleDelete}
              onSort={this.handelSort}
            />
            <Pagination
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              itemsCount={filterd.length}
              onPageChange={this.handlePaginationChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
