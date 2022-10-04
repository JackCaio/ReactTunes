import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
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

  handleInput = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({
      user,
    });
  };

  validMail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  validate = (value, name) => {
    if (value.length === 0) return false;
    if (name === 'email') {
      return this.validMail(value);
    }
    return true;
  };

  enableBtn = () => {
    const { user: { name, email, description, image } } = this.state;
    const validName = this.validate(name, 'name');
    const validMail = this.validate(email, 'email');
    const validDesc = this.validate(description, 'description');
    const validImag = this.validate(image, 'image');
    return validName && validMail && validDesc && validImag;
  };

  updateUsr = async () => {
    const { history: { push } } = this.props;
    const { user } = this.state;
    this.setState({ loading: true });
    await updateUser(user);
    push('/profile');
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <>
            <label htmlFor="name">
              name
              <input
                id="name"
                name="name"
                type="text"
                value={ user.name }
                onChange={ this.handleInput }
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              mail
              <input
                id="email"
                name="email"
                type="text"
                value={ user.email }
                onChange={ this.handleInput }
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description">
              desc
              <input
                id="description"
                name="description"
                type="text"
                value={ user.description }
                onChange={ this.handleInput }
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="image">
              imag
              <input
                id="image"
                name="image"
                type="text"
                value={ user.image }
                onChange={ this.handleInput }
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ !this.enableBtn() }
              onClick={ this.updateUsr }
            >
              Save
            </button>
          </>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
