import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songs: [],
      album: {},
      favSongs: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.fetchSongs(params.id);
    this.fetchFavSongs();
  }

  fetchSongs = async (id) => {
    const result = await getMusics(id);
    this.setState({
      album: result[0],
      songs: result.slice(1),
    });
  };

  fetchFavSongs = async () => {
    const favSongs = await getFavoriteSongs();
    const favIds = favSongs.map((song) => song.trackId);
    this.setState({
      loading: false,
      favSongs: [...favIds],
    });
  };

  addFav = (id) => {
    this.setState((prev) => ({
      favSongs: [...prev.favSongs, id],
    }));
  };

  rmFav = (id) => {
    const { favSongs } = this.state;
    favSongs.splice(favSongs.indexOf(id), 1);
    this.setState({
      favSongs,
    });
  };

  favState = (id, operation) => {
    switch (operation) {
    case 'remove':
      this.rmFav(id);
      break;
    default:
      this.addFav(id);
    }
  };

  render() {
    const { loading, album, songs, favSongs } = this.state;
    const content = (
      <>
        <h2 data-testid="artist-name">{album.artistName}</h2>
        <h4 data-testid="album-name">{album.collectionName}</h4>
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            song={ song }
            favState={ this.favState }
            isFav={ favSongs.includes(song.trackId) }
          />
        ))}
      </>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : content}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
