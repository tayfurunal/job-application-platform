import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewUser } from '../../../actions/securityActions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.createNewUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <div>
        <div className='register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Sign Up</h1>
                <p className='lead text-center'>Create your Account</p>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    {errors.message && <h5>{errors.message}</h5>}
                    <input
                      type='email'
                      className={
                        errors.email
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Email'
                      name='email'
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className='invalid-feedback'>{errors.email}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={
                        errors.username
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Username'
                      name='username'
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {errors.username && (
                      <div className='invalid-feedback'>{errors.username}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className={
                        errors.password
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Password'
                      name='password'
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                  <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);
