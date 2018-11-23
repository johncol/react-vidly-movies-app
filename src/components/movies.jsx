import React, { Component } from 'react';

import { getMovies } from './../services/fakeMovieService';
import Favorite from './common/favorite';
import Pagination from './common/pagination';
import paginate from '../services/utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    moviesPerPage: 2,
    currentPage: 1
  };

  componentDidMount = () => {
    this.setState({ movies: getMovies() });
  };

  handleDeleteMovie = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    this.setState({ movies });
  };

  handleToggleFavorite = movie => {
    const updatedMovie = {
      ...movie,
      isFavorite: !movie.isFavorite
    };

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies.splice(index, 1, updatedMovie);

    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, moviesPerPage, movies: allMovies } = this.state;

    const thereAreNotMoviesAvailable = count === 0;
    if (thereAreNotMoviesAvailable) {
      return <p>There are not any movies available</p>;
    }

    const movies = paginate(allMovies, currentPage, moviesPerPage);

    return (
      <section>
        <p>There are {count} movies available</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Number in stock</th>
              <th>Rate</th>
              <th>Favorite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td style={{ textAlign: 'center' }}>
                  <Favorite
                    isFavorite={movie.isFavorite}
                    onToggleFavorite={() => this.handleToggleFavorite(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDeleteMovie(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={count}
          itemsPerPage={this.state.moviesPerPage}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </section>
    );
  }
}

export default Movies;
