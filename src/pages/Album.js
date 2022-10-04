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
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.fetchSongs(params.id);
  }

  fetchSongs = async (id) => {
    const result = await getMusics(id);
    // const album = result.find((alb) => alb.wrapperType === 'collection');
    // const songs = result.filter((alb) => alb.wrapperType === 'track');
    this.setState({
      album: result[0],
      songs: result.slice(1),
    });
  };

  render() {
    const { album, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{album.artistName}</h2>
        <h4 data-testid="album-name">{album.collectionName}</h4>
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
