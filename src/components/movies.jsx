import React, { Component } from 'react';

import './movies.scss';

import { getMovies } from './../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Favorite from './common/favorite';
import Pagination from './common/pagination';
import paginate from '../services/utils/paginate';
import ListGroup from './common/list-group';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    moviesPerPage: 3,
    currentPage: 1,
    filteredByGenre: { _id: '', name: 'All genres' }
  };

  componentDidMount = () => {
    this.setState({
      movies: getMovies(),
      genres: [this.state.filteredByGenre, ...getGenres()]
    });
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

  handleGenreSelected = genre => {
    this.setState({
      filteredByGenre: genre,
      currentPage: 1
    });
  };

  filterBySelectedGenre = () => {
    const { movies, filteredByGenre } = this.state;
    if (!filteredByGenre._id) {
      return movies;
    }
    return movies.filter(movie => movie.genre._id === filteredByGenre._id);
  };

  render() {
    const { currentPage, moviesPerPage } = this.state;

    const thereAreNotMoviesAvailable = this.state.movies.length === 0;
    if (thereAreNotMoviesAvailable) {
      return <p>There are not any movies available</p>;
    }

    const moviesToShow = this.filterBySelectedGenre();
    const movies = paginate(moviesToShow, currentPage, moviesPerPage);
    const count = moviesToShow.length;

    return (
      <section>
        <p>There are {count} movies available</p>
        <div className="movies-container">
          <div>
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.filteredByGenre}
              onItemSelected={this.handleGenreSelected}
            />
          </div>
          <div>
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
                        onToggleFavorite={() =>
                          this.handleToggleFavorite(movie)
                        }
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
          </div>
        </div>
      </section>
    );
  }
}

export default Movies;
