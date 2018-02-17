import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import Index from './Index.js';
import SingleCard from './SingleCard.js';
import ListofPaths from './ListofPaths.js';
import MainNavbar from './MainNavbar.js';
import NotFound from './NotFound';
import AdminIndex from './admin/Index';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({path, component}) => {
  if (!Meteor.userId()) {
    return null;
  }
  return <Route exact path={path} component={component} />
}


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <MainNavbar userId={this.props.userId} />

          <Switch>
            <Route exact path="/" component={Index} />
            <PrivateRoute path="/admin" component={AdminIndex} />
            <Route exact path="/listofpaths" component={ListofPaths} />
            <Route exact path="/card" component={SingleCard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => ({
  userId: Meteor.userId()
}))(App);