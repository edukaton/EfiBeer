import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import Index from './Index.js';

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
        </div>
      </Router>
    );
  }
}