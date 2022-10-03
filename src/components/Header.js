import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <div data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">{name}</p>
        <NavLink
          to="/search"
          activeClassName="active__nav"
          data-testid="link-to-search"
        >
          Search
        </NavLink>
        <NavLink
          to="/favorites"
          activeClassName="active__nav"
          data-testid="link-to-favorites"
        >
          Favorites
        </NavLink>
        <NavLink
          to="/profile"
          activeClassName="active__nav"
          data-testid="link-to-profile"
        >
          Profile
        </NavLink>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
