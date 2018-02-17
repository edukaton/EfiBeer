import React from 'react';
import './listofpaths.css';


export default () => 
	// <div className="container">
	<div className="row list-of-paths">
	<nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li>
    </ul>
  </div>
</nav>
	<ul className="list-group">
		<li className="list-group-item">
			Pierwsza ścieżka
			<span className="badge float-right badge-success">
				40%
			</span>
		</li>
		<li className="list-group-item">
			Druga ścieżka
			<span className="badge float-right badge-success">
				60%
			</span>
		</li>
		<li className="list-group-item">
			Trzecia ścieżka
			<span className="badge float-right badge-success">
				30%
			</span>
		</li>
	</ul>
	</div>;
	// </div>;
