import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, fetchMovies, resetError } from '../actions';
import { StoreState } from '../reducers';
import { MovieCards } from './MovieCards';
import {
  Input,
  Menu,
  Segment,
  Card,
  Header,
  Icon,
  Grid,
  Divider,
  Button,
} from 'semantic-ui-react';

import '../App.css';

interface AppProps {
  movies: Movie[];
  fetchMovies: Function;
  error: Error;
  resetError: typeof resetError;
}

interface AppState {
  movieName: string;
  activeItem: string;
  visible: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      movieName: '',
      activeItem: 'Search Results',
      visible: true,
    };
  }

  // componentDidUpdate(prevProps: AppProps, prevState: AppState): void {
  //   if (prevState.visible && this.state.activeItem === 'Nominations') {
  //     this.setState({ ...this.state, visible: !this.state.visible });
  //     console.log(this.state);
  //   }
  // }

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

  renderList(): JSX.Element[] {
    return this.props.movies.map((movie: Movie) => {
      return <MovieCards key={movie.imdbID} movie={movie} />;
    });
  }

  handleItemClick = (e: React.MouseEvent) => {
    const tabName = e.currentTarget.innerHTML;
    this.setState({
      ...this.state,
      activeItem: tabName,
    });
  };

  clear = (): void => {
    if (window['localStorage']['nomination']) {
      localStorage.removeItem('nomination');
    }
  };
  render() {
    const { movieName, activeItem, visible } = this.state;
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
                    {error ? message : this.renderList()}
                  </Card.Group>
                }
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Icon name="world" />
                  Your Nominations
                </Header>
                <Button primary>Create</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {/* <button onClick={this.onButtonClick}>Search</button>
        <button onClick={() => this.clear()}>Clear Storage</button> */}
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

export const App = connect(MapStateToProps, { fetchMovies, resetError })(_App);
