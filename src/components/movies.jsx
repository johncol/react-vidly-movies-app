import React, { Component } from 'react';

import {
  getMovies,
  deleteMovie,
  saveMovie
} from './../services/fakeMovieService';
import Favorite from './favorite';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  delete = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    this.setState({ movies });
  };

  toggleFavorite = movie => {
    const updatedMovie = {
      ...movie,
      isFavorite: !movie.isFavorite
    };

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies.splice(index, 1, updatedMovie);

    this.setState({ movies });
  };

  render() {
    const count = this.state.movies.length;

    const thereAreNotMoviesAvailable = count === 0;
    if (thereAreNotMoviesAvailable) {
      return <p>There are not any movies available</p>;
    }

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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td style={{ textAlign: 'center' }}>
                  <Favorite
                    isFavorite={movie.isFavorite}
                    onToggleFavorite={() => this.toggleFavorite(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.delete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Movies;
