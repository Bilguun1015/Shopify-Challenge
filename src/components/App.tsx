import React from 'react';
import { connect } from 'react-redux';
import { Movie, Error, fetchMovies, resetError } from '../actions';
import { StoreState } from '../reducers';
import { MovieCards } from './MovieCards';
import { Input, Menu, Segment, Card, Header, Icon } from 'semantic-ui-react';

interface AppProps {
  movies: Movie[];
  fetchMovies: Function;
  error: Error;
  resetError: typeof resetError;
}

class _App extends React.Component<AppProps> {
  state = { movieName: '', activeItem: 'Search Results' };

  // componentDidUpdate(prevProps: AppProps): void {
  //   if (!prevProps.movies.length && this.props.movies.length) {
  //     this.props.resetError();
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
    console.log(this.state);
  };

  clear = (): void => {
    if (window['localStorage']['nomination']) {
      localStorage.removeItem('nomination');
    }
  };
  render() {
    const { movieName, activeItem } = this.state;
    const { error, message } = this.props.error;
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Search Results"
            active={activeItem === 'Search Results'}
            onClick={this.handleItemClick}
          ></Menu.Item>
          <Menu.Item
            name="Nominations"
            active={activeItem === 'Nominations'}
            onClick={this.handleItemClick}
          ></Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item></Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment placeholder>
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
          <Card.Group>{error ? message : this.renderList()}</Card.Group>
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
