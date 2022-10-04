import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  addFavorite = async (event) => {
    const { checked } = event.target;
    const { song, addFav } = this.props;
    if (checked) {
      this.setState({ loading: true });
      addFav(song.trackId);
      await addSong(song);
      this.setState({ loading: false });
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
            onChange={ this.addFavorite }
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
  addFav: PropTypes.func.isRequired,
  isFav: PropTypes.bool,
};
