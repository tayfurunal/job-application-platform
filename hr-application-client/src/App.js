import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';

import store from './store';
import ManagerPanel from './components/ManagerPanel';
import AddJob from './components/AddJob';
import MakeApplication from './components/MakeApplication';
import Application from './components/Application';
import Header from './components/Layout/Header';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/secureRoutes';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const jwtToken = localStorage.jwtToken;
const roles = [];
roles[0] = localStorage.roles;
console.log(roles);
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
    roles: roles
  });

  const currentTime = Date.now() / 1000;

  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />

          <Switch>
            <SecureRoute exact path='/managerPanel' component={ManagerPanel} />
            <SecureRoute exact path='/addJob' component={AddJob} />
            <SecureRoute
              exact
              path='/application/:id'
              component={Application}
            />
            <SecureRoute
              exact
              path='/makeApplication/:id'
              component={MakeApplication}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
