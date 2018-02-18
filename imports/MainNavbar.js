import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';



export default ({ userId }) =>
<nav className="navbar navbar-inverse" id="mainNavbarComponent">
  <div className="container">
    <div className="navbar-header">
      <Link to="/"><span className="navbar-brand" href="/"> {<i className="far fa-clone"></i>} eduCards</span></Link>
    </div>
    <ul className="nav">
      {userId ?
      	<li><Link to="/admin">{<i className="far fa-edit"></i>} Edytor</Link></li>: ''
       }
       <li><Link to="/listoflessons">{<i className="far fa-file-alt"></i>} Lekcje</Link></li>
    </ul>
    <ul className="nav">
    	<LoginButtons />
    </ul>
  </div>
</nav>;
