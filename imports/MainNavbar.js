import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';

export default ({ userId }) => 
<nav className="navbar navbar-inverse">
  <div className="container">
    <div className="navbar-header">
      <a className="navbar-brand" href="/">EduCards</a>
    </div>
    <ul className="nav">
      <li><a href="/">Home</a></li>
      { userId ?
      //{Meteor.userId() && (
      	<li><a href="/admin">Edytor</a></li>: ''
      //)}
       }
    </ul>
    <ul className="nav">
    	<LoginButtons />
    </ul>
  </div>
</nav>;
