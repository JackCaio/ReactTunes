import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <img
              src={ user.image }
              alt={ user.name }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}

      </div>
    );
  }
}
