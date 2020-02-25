import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';

class Header extends Component {
  logout = () => {
    this.props.logout();
    window.location.href = '/';
  };

  render() {
    const { validToken, user, roles } = this.props.security;

    const userIsHR = (
      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/managerPanel'>
              Manager Panel
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/applications'>
              Applications
            </Link>
          </li>
        </ul>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/dashboard'>
              <i className='fas fa-user-circle mr-1' />
              {user.sub}
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/logout' onClick={this.logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAPPLICANT = (
      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Jobs
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={`/${user.sub}/applications`}>
              My Applications
            </Link>
          </li>
        </ul>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link'>
              <i className='fas fa-user-circle mr-1' />
              {user.sub}
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/logout' onClick={this.logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              Sign Up
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      if (roles[0].includes('ROLE_HR')) {
        headerLinks = userIsHR;
      } else {
        headerLinks = userIsAPPLICANT;
      }
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Job Application Platform
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon' />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, { logout })(Header);
