import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Tracks } from './api/Tracks'
import { withTracker } from 'meteor/react-meteor-data';

const ListofLessons = ({ trackList }) => !trackList ? null :
  <div className="container-fluid" style={{"background": "linear-gradient(to right, rgb(91, 134, 229), rgb(54, 209, 220))", "color": "white"}}>
    <div classNameName="container list-of-paths" style={{"background": "white", "height": "100vh", "color": "black", "text-align": "center"}}>
    <br />
    <h3 className = "text-center" style={{"color": "black"}}>
    	Dostępne lekcje:
    </h3>
    <br />
	<ul className="list-group">
		 {trackList.map(track => (
			<li className="list-group-item">
                <Link to={`/track/${track._id}`}>{track.name}</Link>
            </li>
         ))}


	</ul>
	</div>
  </div>;


export default withTracker(() => ({
	trackList: Tracks.find().fetch(),
}))(ListofLessons);