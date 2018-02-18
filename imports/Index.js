import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracks } from './api/Tracks';
import { Link } from 'react-router-dom';

const Index = ({trackList}) =>
  <div className="landingContainer">
  	<div className="landingCenter">
	    <h1 style={{'font-size': 120}}>EduCards</h1>
	    <h2>Od nauczycieli dla nauczycieli</h2>
			<br /><br />
	    <h3>Zobacz przykładową lekcję!</h3>
			<br /><br />
<div style={{"display": "block"}}>


			{trackList && trackList.map(track => (
  <div className="card" style={{"width": "20rem"}}>
  <img className="card-img-top" src="../landing_cards01.jpg" alt="Card image cap" />
  <div className="card-block">
    <Link to={`/track/${track._id}`}>
    <h4 className="card-title" style={{"color": "black"}}>{track.name}</h4>
    </Link>
    <p className="card-text" style={{"color": "black"}}>Przejdź interaktywną lekcję uczacą jak odróżnić prawidłowe Wiadomości od tych fałszywych.</p>
    <Link to={`/track/${track._id}`}>
    <span className="btn btn-primary">Zacznij lekcje!</span>
    </Link>
    <br />
    <br />
  </div>

</div>
			))}
			</div>

    </div>
  </div>;

export default withTracker(() => ({
	trackList: Tracks.find({ userId: -1 }).fetch(),
}))(Index);

