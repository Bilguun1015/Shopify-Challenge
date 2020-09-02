import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, setNomination } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  movie: Movie;
  setNomination: typeof setNomination;
}

class _MovieCards extends React.Component<AppProps> {
  onButtonClick = (event: React.MouseEvent): void => {
    const imdbID = event.currentTarget.getAttribute('id');
    if (imdbID) {
      this.props.setNomination(imdbID);
    }
  };

  render() {
    const { Title, Year, imdbID } = this.props.movie;
    return (
      <div onClick={this.onButtonClick} id={imdbID}>
        Title: {Title}
        Year: {Year}
      </div>
    );
  }
}

const MapStateToProps = ({ error }: StoreState): { error: Error } => {
  return { error };
};

export const MovieCards = connect(MapStateToProps, { setNomination })(
  _MovieCards
);
