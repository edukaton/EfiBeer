import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import Index from './Index.js';
import SingleCard from './SingleCard.js';
import ListofPaths from './ListofPaths.js';
import MainNavbar from './MainNavbar.js';
import SideNavbar from './SideNavbar.js';
import NotFound from './NotFound';
import AdminIndex from './admin/Index';
import AdminCardList from './admin/CardList';
import AdminAddCard from './admin/AddCard';
import AdminEditCard from './admin/EditCard';

import 'bootstrap/dist/css/bootstrap.min.css';
Meteor.subscribe('cards');
Meteor.subscribe('tracks');
const PrivateRoute = ({path, component: Component}) => (
  <Route 
    exact
    path={path}
    component={props => Meteor.userId() ? <Component {...props} /> : <Redirect to="/" />}
  />
)


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
            <PrivateRoute path="/admin/track/:trackId/edit-card/:cardId" component={AdminEditCard} />
            <PrivateRoute path="/admin/track/:trackId/add-card" component={AdminAddCard} />
            <PrivateRoute path="/admin/track/:trackId" component={AdminCardList} />
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