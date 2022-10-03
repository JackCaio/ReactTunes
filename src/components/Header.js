import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.handleLoading();
  }

  handleLoading = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? <Loading /> : (
          <>
            <h1>Header</h1>
            <p data-testid="header-user-name">{user.name}</p>
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
          </>
        )}
      </div>
    );
  }
}
