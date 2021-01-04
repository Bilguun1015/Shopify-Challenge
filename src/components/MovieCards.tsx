import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, setNomination, deleteNomination, Key } from '../actions';
import { StoreState } from '../reducers';
import { Card, Image, Button } from 'semantic-ui-react';

interface AppProps {
  movie: Movie;
  setNomination: typeof setNomination;
  deleteNomination: typeof deleteNomination;
  nominations: Movie[];
  side: string;
}

class _MovieCards extends React.Component<AppProps> {
  onButtonSave = (event: React.MouseEvent): void => {
    const imdbID = event.currentTarget.getAttribute('id');
    if (imdbID === this.props.movie.imdbID) {
      this.props.setNomination(this.props.movie, imdbID);
    }
  };

  onButtonDelete = (event: React.MouseEvent): void => {
    const imdbID = event.currentTarget.getAttribute('id');
    if (imdbID === this.props.movie.imdbID) {
      this.props.deleteNomination(imdbID);
    }
  };

  // checks if the movie is nominated
  checkNominations = (imdbID: string): boolean => {
    if (this.props.nominations.length >= 5) {
      return true;
    }
    const keys: Key = {};
    this.props.nominations.forEach((each: Movie) => {
      console.log(each);
      keys[each.imdbID] = 1;
    });
    return keys[imdbID] === 1;
  };

  render() {
    const { Title, Year, imdbID, Poster } = this.props.movie;
    return (
      <Card raised={true}>
        <Card.Content>
          <Image src={Poster} floated='right' size='tiny' />
          <Card.Header>{Title}</Card.Header>
          <Card.Meta>
            <span className='date'>Release Year: {Year}</span>
          </Card.Meta>
          <Card.Description></Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.side === 'search' ? (
            <Button
              basic
              color='green'
              onClick={this.onButtonSave}
              id={imdbID}
              disabled={this.checkNominations(imdbID)}
            >
              Nominate
            </Button>
          ) : (
            <Button basic color='red' id={imdbID} onClick={this.onButtonDelete}>
              Remove
            </Button>
          )}
        </Card.Content>
      </Card>
    );
  }
}

const MapStateToProps = ({ error }: StoreState): { error: Error } => {
  return { error };
};

export const MovieCards = connect(MapStateToProps, {
  setNomination,
  deleteNomination,
})(_MovieCards);
