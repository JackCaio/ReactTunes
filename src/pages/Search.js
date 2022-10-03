import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
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
    if (loading) this.handleLoading();
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : <Header { ...user } />}
      </div>
    );
  }
}
