import React from 'react';
import { connect } from 'react-redux';
import { Movie, fetchMovies } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  movies: Movie[];
  fetchMovies: Function;
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
      return (
        <div key={movie.imdbID}>
          Title: {movie.Title}
          Year: {movie.Year}
          <button>Nominate</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <input
          name="movieName"
          value={this.state.movieName}
          onChange={this.onInputChange}
        />
        <button onClick={this.onButtonClick}>Search</button>
        {this.renderList()}
      </div>
    );
  }
}

const MapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const App = connect(MapStateToProps, { fetchMovies })(_App);
