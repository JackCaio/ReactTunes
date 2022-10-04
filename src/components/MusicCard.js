import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  addFavorite = async () => {
    const { song, favState } = this.props;
    this.setState({ loading: true });
    await addSong(song);
    favState(song, 'add');
    this.setState({ loading: false });
  };

  removeFavorite = async () => {
    const { song, favState } = this.props;
    this.setState({ loading: true });
    await removeSong(song);
    favState(song, 'remove');
    this.setState({ loading: false });
  };

  handleFavorites = (event) => {
    const { checked } = event.target;
    if (checked) {
      this.addFavorite();
    } else {
      this.removeFavorite();
    }
  };

  render() {
    const { loading } = this.state;
    const { song: { previewUrl, trackName, trackId }, isFav } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ `fav-${trackId}` }>
          Favorita
          <input
            id={ `fav-${trackId}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorites }
            checked={ isFav }
          />
        </label>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  isFav: false,
};

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favState: PropTypes.func.isRequired,
  isFav: PropTypes.bool,
};
