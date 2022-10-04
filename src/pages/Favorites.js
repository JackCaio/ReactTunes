import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.findFavSongs();
  }

  findFavSongs = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({
      favSongs,
      loading: false,
    });
  };

  addFav = (song) => {
    this.setState((prev) => ({
      favSongs: [...prev.favSongs, song],
    }));
  };

  rmFav = (song) => {
    this.setState((prev) => ({
      favSongs: prev.favSongs.filter((sg) => sg !== song),
    }));
  };

  favState = (song, operation) => {
    switch (operation) {
    case 'remove':
      this.rmFav(song);
      break;
    default:
      this.addFav(song);
      break;
    }
  };

  render() {
    const { loading, favSongs } = this.state;
    const component = (
      <>
        <h1>Favorites</h1>
        {favSongs.map((song) => (<MusicCard
          key={ song.trackId }
          song={ song }
          favState={ this.favState }
          isFav={ favSongs.includes(song) }
        />))}
      </>
    );
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : component}
      </div>
    );
  }
}
