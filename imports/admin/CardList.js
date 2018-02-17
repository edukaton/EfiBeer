import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracks, authorizeTrack } from '../api/Tracks';
import { Cards  } from '../api/Cards';
import { Link } from 'react-router-dom';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { track, cardList } = this.props;
    if (!track) {
      return null;
    }
    return (
      <div>
        <h1>
          {track.name}
        </h1>
        <Link to={`/admin/track/${track._id}/add-card`}>
          Dodaj kartę
        </Link>
        <ul>
          {cardList.map(card => (
            <li>
              <Link to={`/admin/track/${track._id}/edit-card/${card._id}`}>
                {card.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withTracker(({match}) => {
  const { trackId } = match.params;
  const track = Tracks.findOne(trackId);
  if (track) {
    authorizeTrack(trackId, Meteor.userId());
  }
  const cardList = Cards.find({ trackId }).fetch();
  return {
    track,
    cardList,
  };
})(CardList);
