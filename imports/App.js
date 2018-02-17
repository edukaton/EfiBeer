import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import Index from './Index.js';
import ListofPaths from './ListofPaths.js';
import MainNavbar from './MainNavbar.js';

import 'bootstrap/dist/css/bootstrap.css';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <LoginButtons />
          <Route exact path="/" component={Index} />
          <Route exact path="/navbar" component={MainNavbar} />
          <Route exact path="/listofpaths" component={ListofPaths} />

        </div>
      </Router>
    );
  }
}