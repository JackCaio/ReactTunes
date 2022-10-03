import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const NAME_LENGTH = 3;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      loading: false,
    };
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  enableButton = () => {
    const { login } = this.state;
    return login.length >= NAME_LENGTH;
  };

  handleUser = async () => {
    const { history: { push } } = this.props;
    this.setState({
      loading: true,
    });
    const { login } = this.state;
    const obj = {
      name: login,
    };
    await createUser(obj);
    this.setState({
      loading: false,
    });
    push('/search');
  };

  render() {
    const { login, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <>
            <label htmlFor="login">
              Login
              <input
                id="login"
                name="login"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleInput }
                value={ login }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ !this.enableButton() }
              onClick={ this.handleUser }
            >
              Entrar
            </button>
          </>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
