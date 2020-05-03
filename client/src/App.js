import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
//Redux
import { Provider } from 'react-redux'; //package combines react and redux features
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing}></Route>
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
