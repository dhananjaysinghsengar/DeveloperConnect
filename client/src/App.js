import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux'; //package combines react and redux features
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing}></Route>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
