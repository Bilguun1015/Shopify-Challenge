import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, setNomination } from '../actions';
import { StoreState } from '../reducers';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

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
          <Button basic color="green" onClick={this.onButtonClick} id={imdbID}>
            Nominate
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const MapStateToProps = ({ error }: StoreState): { error: Error } => {
  return { error };
};

export const MovieCards = connect(MapStateToProps, { setNomination })(
  _MovieCards
);

{
  /* <div onClick={this.onButtonClick} id={imdbID}>
        Title: {Title}
        Year: {Year}
      </div> */
}
