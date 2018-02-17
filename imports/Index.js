import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracks } from './api/Tracks';
import { Link } from 'react-router-dom';

const Index = ({trackList}) => 
  <div className="landingContainer">
  	<div className="landingCenter">
	    <h1>eduCards</h1>
	    <h2>prawdopodobnie najlepsza apka edukacyjna we wszechświecie</h2>
			<br /><br />
	    <h3>Wypróbuj przykładową lekcje</h3>
			<br /><br />
			{trackList && trackList.map(track => (
				<div>
					<strong>
						<Link to={`/track/${track._id}`}>
							{track.name}
						</Link>
					</strong>
				</div>
			))}
    </div>
  </div>;

export default withTracker(() => ({
	trackList: Tracks.find({ userId: -1 }).fetch(),
}))(Index);