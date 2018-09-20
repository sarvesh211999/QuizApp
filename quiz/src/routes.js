import React from 'react';
// import { Route, IndexRoute, Link, Switch,withRouter } from 'react-router';
// import { Redirect } from 'react-router-dom';
import {  Link, Route, Redirect, Switch,withRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import App from './components/App';
import Dashboard from './components/dashboard';
import QuizList from './components/quizList';
import Home from './components/home';
import Login from './components/login'

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
};

const AuthStatus = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
			<button onClick={() => {
        AuthService.logout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

export default (
  <Route exact path='/' component={App}>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/login' component={Login}/>
    <Route path='*' component={Home} />
  </Route>
);