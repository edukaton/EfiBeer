import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default ({ userId }) =>
<nav className="navbar navbar-inverse" id="mainNavbarComponent">
  <div className="container">
    <div className="navbar-header">
      <a className="navbar-brand" href="/"> {<i className="far fa-clone"></i>} eduCards</a>
    </div>
    <ul className="nav">
      <li><Link to="/">{<i className="fas fa-home"></i>} Home</Link></li>
      {userId ?
      	<li><Link to="/admin">{<i className="far fa-edit"></i>} Edytor</Link></li>: ''
       }
    </ul>
    <ul className="nav">
    	<LoginButtons />
    </ul>
  </div>
</nav>;
