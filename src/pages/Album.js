import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      album: {},
      favSongs: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.fetchSongs(params.id);
  }

  fetchSongs = async (id) => {
    const result = await getMusics(id);
    this.setState({
      album: result[0],
      songs: result.slice(1),
    });
  };

  addFav = (id) => {
    this.setState((prev) => ({
      favSongs: [...prev.favSongs, id],
    }));
  };

  render() {
    const { album, songs, favSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{album.artistName}</h2>
        <h4 data-testid="album-name">{album.collectionName}</h4>
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            song={ song }
            addFav={ this.addFav }
            isFav={ favSongs.includes(song.trackId) }
          />
        ))}
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
