import React from 'react';
import { connect } from 'react-redux';
import {
  Movie,
  Error,
  fetchMovies,
  resetError,
  fetchNominations,
  Key,
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
  Form,
  Button,
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
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      movieName: '',
      fetching: false,
    };
  }

  componentDidMount(): void {
    this.props.fetchNominations();
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.movies.length && this.props.movies.length) {
      this.setState({ fetching: false });
    }
    if (prevProps.movies !== this.props.movies) {
      this.setState({ fetching: false });
    }
    if (!prevProps.error.message.length && this.props.error.message) {
      this.setState({ fetching: false });
    }
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
    this.setState({ ...this.state, fetching: true });
  };

  checkNominations = (imdbID: string): boolean => {
    if (this.props.nominations.length >= 5) {
      return true;
    }
    const keys: Key = {};
    this.props.nominations.forEach((each: Movie) => {
      keys[each.imdbID] = 1;
    });
    return keys[imdbID] === 1;
  };

  renderMovies(): JSX.Element[] {
    return this.props.movies.map((movie: Movie) => {
      return (
        <MovieCards
          key={movie.imdbID}
          movie={movie}
          nominations={this.checkNominations}
          side="search"
        />
      );
    });
  }

  renderNominations(): JSX.Element[] {
    return this.props.nominations.map((movie: Movie) => {
      return (
        <MovieCards
          key={movie.imdbID}
          movie={movie}
          nominations={this.checkNominations}
          side="nomination"
        />
      );
    });
  }

  clear = (): void => {
    if (window['localStorage']['nomination']) {
      localStorage.removeItem('nomination');
    }
  };
  render() {
    const { movieName, fetching } = this.state;
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
                <Form>
                  <Form.Field>
                    <Input
                      name="movieName"
                      defaultValue={movieName}
                      onChange={this.onInputChange}
                      placeholder="search movies..."
                    ></Input>
                    <Button
                      basic
                      loading={fetching}
                      type="submit"
                      onClick={this.onButtonClick}
                    >
                      Search
                    </Button>
                  </Form.Field>
                </Form>
                {
                  <Card.Group centered>
                    {error ? message : this.renderMovies()}
                  </Card.Group>
                }
              </Grid.Column>
              {this.props.nominations.length > 0 ? (
                <Grid.Column className="nominations">
                  <Header icon>
                    <Icon name="world" />
                    Your Nominations
                  </Header>
                  <Segment
                    className={
                      this.props.nominations.length >= 5 ? 'visible' : 'hidden'
                    }
                  >
                    You nominated your maximum of five movies.
                  </Segment>
                  <Card.Group centered>{this.renderNominations()}</Card.Group>
                </Grid.Column>
              ) : (
                <Grid.Column>
                  <Header icon>
                    <Icon name="world" />
                    You don't have any nominations.
                  </Header>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
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
