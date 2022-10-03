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
      artist: '',
    };
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    const { match: { params } } = this.props;
    const result = await getMusics(params.id);
    const album = result.find((alb) => alb.wrapperType === 'collection');
    const songs = result.filter((alb) => alb.wrapperType === 'track');
    this.setState({
      songs,
      artist: album.artistName,
      album: album.collectionName,
    });
  };

  render() {
    const { artist, album, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artist}</h2>
        <h4 data-testid="album-name">{album}</h4>
        {songs.map((song) => <MusicCard key={ song.trackId } { ...song } />)}
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
