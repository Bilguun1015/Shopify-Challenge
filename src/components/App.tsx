import React from 'react';
import { connect } from 'react-redux';
import {
  Movie,
  Error,
  fetchMovies,
  resetError,
  fetchNominations,
} from '../actions';
import { StoreState } from '../reducers';
import { MovieCards } from './MovieCards';
import {
  Input,
  Segment,
  Card,
  Header,
  Icon,
  Grid,
  Divider,
} from 'semantic-ui-react';

import '../App.css';

interface AppProps {
  movies: Movie[];
  fetchMovies: Function;
  error: Error;
  resetError: typeof resetError;
  fetchNominations: typeof fetchNominations;
  nominations: Movie[];
}

interface AppState {
  movieName: string;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      movieName: '',
    };
  }

  componentDidMount() {
    this.props.fetchNominations();
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onButtonClick = (): void => {
    this.props.resetError();
    const name = this.state.movieName.replace(/\s/g, '+');
    this.props.fetchMovies(name);
  };

  renderMovies(): JSX.Element[] {
    return this.props.movies.map((movie: Movie) => {
      return <MovieCards key={movie.imdbID} movie={movie} />;
    });
  }

  renderNominations(): JSX.Element {
    if (this.props.nominations.length > 0) {
      return (
        <Grid.Column>
          <Header icon>
            <Icon name="world" />
            Your Nominations
          </Header>
          {this.props.nominations.map((movie: Movie) => {
            return <MovieCards key={movie.imdbID} movie={movie} />;
          })}
        </Grid.Column>
      );
    }
    return (
      <Grid.Column>
        <Header icon>
          <Icon name="world" />
          You don't have any nominations.
        </Header>
      </Grid.Column>
    );
  }

  clear = (): void => {
    if (window['localStorage']['nomination']) {
      localStorage.removeItem('nomination');
    }
  };
  render() {
    const { movieName } = this.state;
    const { error, message } = this.props.error;
    return (
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="tv" circular />
          <Header.Content>The Shoppies</Header.Content>
        </Header>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical></Divider>

            <Grid.Row verticalAlign="top">
              <Grid.Column>
                <Header icon>
                  <Icon name="search" />
                  Find Movies
                </Header>
                <Input
                  name="movieName"
                  defaultValue={movieName}
                  onChange={this.onInputChange}
                  action={{
                    type: 'submit',
                    content: 'Search',
                    onClick: this.onButtonClick,
                  }}
                  placeholder="search movies..."
                ></Input>
                {
                  <Card.Group centered>
                    {error ? message : this.renderMovies()}
                  </Card.Group>
                }
              </Grid.Column>
              {this.renderNominations()}
              {/* <Grid.Column>
                <Header icon>
                  <Icon name="world" />
                  You don't have any nominations.
                </Header>
              </Grid.Column> */}
            </Grid.Row>
          </Grid>
        </Segment>
        <button onClick={() => this.clear()}>Clear Storage</button>
      </div>
    );
  }
}

const MapStateToProps = ({
  movies,
  error,
  nominations,
}: StoreState): { movies: Movie[]; error: Error; nominations: Movie[] } => {
  return { movies, error, nominations };
};

export const App = connect(MapStateToProps, {
  fetchMovies,
  resetError,
  fetchNominations,
})(_App);
