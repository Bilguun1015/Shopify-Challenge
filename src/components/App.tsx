import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, fetchMovies } from '../actions';
import { StoreState } from '../reducers';
import { _MovieCards } from './MovieCards';

interface AppProps {
  movies: Movie[];
  fetchMovies: Function;
  error: Error;
}

class _App extends React.Component<AppProps> {
  state = { movieName: '' };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onButtonClick = (): void => {
    const name = this.state.movieName.replace(/\s/g, '+');
    this.props.fetchMovies(name);
  };

  renderList(): JSX.Element[] {
    return this.props.movies.map((movie: Movie) => {
      return <_MovieCards key={movie.imdbID} movie={movie} />;
    });
  }

  render() {
    const { error, message } = this.props.error;
    return (
      <div>
        <input
          name="movieName"
          value={this.state.movieName}
          onChange={this.onInputChange}
        />
        <button onClick={this.onButtonClick}>Search</button>
        {error ? message : this.renderList()}
      </div>
    );
  }
}

const MapStateToProps = ({
  movies,
  error,
}: StoreState): { movies: Movie[]; error: Error } => {
  return { movies, error };
};

export const App = connect(MapStateToProps, { fetchMovies })(_App);
