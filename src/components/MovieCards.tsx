import React from 'react';
// import { connect } from 'react-redux';
import { Movie, Error, fetchMovies } from '../actions';
// import { StoreState } from '../reducers';

interface AppProps {
  movie: Movie;
}

export class _MovieCards extends React.Component<AppProps> {
  render() {
    const { Title, Year } = this.props.movie;
    return (
      <div>
        Title: {Title}
        Year: {Year}
      </div>
    );
  }
}

// const MapStateToProps = ({
//   movies,
//   error,
// }: StoreState): { movies: Movie[]; error: Error } => {
//   return { movies, error };
// };

// export const MovieCards = connect(MapStateToProps, { fetchMovies })(
//   _MovieCards
// );
