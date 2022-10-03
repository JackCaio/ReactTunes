import React, { Component } from 'react';
import AlbumComp from '../components/Album';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const SEARCH_LENGTH = 2;
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      search: '',
      artista: '',
      albuns: [],
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

  searchArtist = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
      search: '',
    });
    const albuns = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      artista: search,
      albuns,
    });
  };

  render() {
    const { search, loading, albuns, artista } = this.state;
    const albumSection = ((albuns.length > 0) ? (
      <>
        <h4>{`Resultado de álbuns de: ${artista}`}</h4>
        {albuns.map((album, i) => <AlbumComp key={ i } { ...album } />)}
      </>
    ) : <h1>Nenhum álbum foi encontrado</h1>);
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <>
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
          </>
        )}
        {artista !== '' && albumSection}
      </div>
    );
  }
}
