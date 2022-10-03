import React, { Component } from 'react';
import Header from '../components/Header';

const SEARCH_LENGTH = 2;
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

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

  searchArtist = () => {
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          onClick={ this.searchArtist }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
