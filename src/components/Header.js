import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <div data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">{name}</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
