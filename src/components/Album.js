import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumComp extends Component {
  render() {
    const { artistName, collectionName, collectionId } = this.props;
    return (
      <div>
        <p>{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}
        </Link>
      </div>
    );
  }
}

AlbumComp.defaultProps = {
  artistName: '',
  // artworkUrl100: '',
  collectionName: '',
  // collectionPrice: 0,
  // releaseDate: '',
  // trackCount: 0,
};

AlbumComp.propTypes = {
  artistName: PropTypes.string,
  // artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionId: PropTypes.number.isRequired,
  // collectionPrice: PropTypes.number,
  // releaseDate: PropTypes.string,
  // trackCount: PropTypes.number,
};
