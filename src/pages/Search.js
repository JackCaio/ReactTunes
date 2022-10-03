import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

const SEARCH_LENGTH = 2;
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
      search: '',
    };
  }

  handleLoading = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  };

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleButton = () => {
    const { search } = this.state;
    return search.length >= SEARCH_LENGTH;
  };

  render() {
    const { loading, user, search } = this.state;
    if (loading) this.handleLoading();
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <>
            <Header { ...user } />
            <label htmlFor="search">
              <input
                id="search"
                name="search"
                type="text"
                data-testid="search-artist-input"
                onChange={ this.handleInput }
                value={ search }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ !this.handleButton() }
            >
              Pesquisar
            </button>
          </>
        )}
      </div>
    );
  }
}
