import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import Index from './Index.js';
import NotFound from './NotFound';
import AdminIndex from './admin/Index';

import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({path, component}) => {
  if (!Meteor.userId()) {
    return null;
  }
  return <Route exact path={path} component={component} />
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <LoginButtons />
          <Switch>
            <Route exact path="/" component={Index} />
            <PrivateRoute path="/admin" component={AdminIndex} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
