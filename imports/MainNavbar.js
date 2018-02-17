import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default ({ userId }) => 
<nav className="navbar navbar-inverse">
  <div className="container">
    <div className="navbar-header">
      <a className="navbar-brand" href="/">EduCards</a>
    </div>
    <ul className="nav">
      <li><Link to="/">Home</Link></li>
      {userId ?
      	<li><Link to="/admin">Edytor</Link></li>: ''
       }
    </ul>
    <ul className="nav">
    	<LoginButtons />
    </ul>
  </div>
</nav>;
