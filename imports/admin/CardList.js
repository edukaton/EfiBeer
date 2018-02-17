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
      <div style={{'background': '#36D1DC',
    'background': '-webkit-linear-gradient(to right, #5B86E5, #36D1DC)',
    'background': 'linear-gradient(to right, #5B86E5, #36D1DC)', 'height': '100%', 'height': '100vh'}} >
      <div className = "container" style={{'max-width': 600, 'background': 'white', 'height': '100%', 'height': '100vh'}}>
        <h1 className = "text-center">
          {track.name}
        </h1>
        <br />
        <Link to={`/admin/track/${track._id}/add-card`} className = "btn btn-primary btn-block">
          Dodaj nową kartę
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
        <br />
        <h4 className = "text-center">
          Aktualnie karty:
        </h4>
        <div classNameName="row list-of-paths">
          <ul className="list-group">
            <li className="list-group-item">
              Tytuł karty
              <span className="badge float-right badge-success">
                Info
              </span>
            </li>
            <li className="list-group-item">
              Tytuł karty
              <span className="badge float-right badge-success">
                ABCD
              </span>
            </li>
            <li className="list-group-item">
              Tytuł karty
              <span className="badge float-right badge-success">
                True/False
              </span>
            </li>
          </ul>
        </div>
      </div>
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
