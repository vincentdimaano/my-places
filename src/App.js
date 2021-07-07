import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/navigation/MainNavigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

let routes;

if (isLoggedIn) {
  routes = (
    <Switch>
  <Route path='/' component={Users} exact />
  <Route path='/:uid/places' component={UserPlaces} exact />
  <Route path='/places/new' component={NewPlace} exact />
            <Route path='/places/:pid' component={UpdatePlace} exact />
  <Redirect to='/' />
    </Switch>
  );
} else {
  routes = (
    <Switch>
  <Route path='/' component={Users} exact />
  <Route path='/:uid/places' component={UserPlaces} exact />
  <Route path='/auth' component={Auth} exact />
  <Redirect to='/auth' />
    </Switch>
  );
}

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
