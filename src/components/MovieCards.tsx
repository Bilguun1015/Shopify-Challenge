import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, setNomination } from '../actions';
import { StoreState } from '../reducers';
import { Card, Image, Button } from 'semantic-ui-react';

interface AppProps {
  movie: Movie;
  setNomination: typeof setNomination;
  nominations(imdbID: string): boolean;
  side: string;
}

class _MovieCards extends React.Component<AppProps> {
  state = { disabled: false };

  onButtonClick = (event: React.MouseEvent): void => {
    const imdbID = event.currentTarget.getAttribute('id');
    if (imdbID === this.props.movie.imdbID) {
      this.props.setNomination(this.props.movie, imdbID);
    }
    this.setState({ disabled: true });
  };

  render() {
    const { Title, Year, imdbID, Poster } = this.props.movie;
    return (
      <Card raised={true}>
        <Card.Content>
          <Image src={Poster} floated="right" size="mini" />
          <Card.Header>{Title}</Card.Header>
          <Card.Meta>
            <span className="date">Release Year: {Year}</span>
          </Card.Meta>
          <Card.Description></Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.side === 'search' ? (
            <Button
              basic
              color="green"
              onClick={this.onButtonClick}
              id={imdbID}
              disabled={this.props.nominations(imdbID)}
            >
              Nominate
            </Button>
          ) : (
            <Button basic color="red">
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
})(_MovieCards);
