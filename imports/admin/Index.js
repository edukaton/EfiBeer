import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tracks } from '../api/Tracks';

class Index extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeNewTrackName = this.changeNewTrackName.bind(this);
    this.changeEditingTrackId = this.changeEditingTrackId.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      newTrackName: '',
      editingTrackId: null,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editingTrackId) {
      Meteor.call(
        'tracks.update', 
        this.state.editingTrackId,
        this.state.newTrackName
      );
    } else {
      Meteor.call('tracks.insert', this.state.newTrackName);
    }
    this.reset();
  }

  reset(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      newTrackName: '',
      editingTrackId: null,
    })
  }

  changeEditingTrackId(trackId, currentName) {
    return e => {
      e.preventDefault();
      this.setState({
        editingTrackId: trackId,
        newTrackName: currentName,
      })
    }
  }

  deleteTrack(trackId) {
    return e => {
      e.preventDefault();
      Meteor.call('tracks.remove', trackId);
    }
  }

  changeNewTrackName(e) {
    this.setState({
      newTrackName: e.target.value,
    });
  }

  render() {
    return (
      <div>
        Admin<br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="nazwa ścieki"
            value={this.state.newTrackName}
            onChange={this.changeNewTrackName}
          />
          <button>Wyślij</button>
          {this.state.editingTrackId && (
            <button
              type="button"
              onClick={this.reset}
            >
              Resetuj
            </button>
          )}
        </form>
        <div>
          Lista ściezek:
          <ul>
            {this.props.tracks.map(track => (
              <li>
                {track.name}
                <button onClick={this.changeEditingTrackId(track._id, track.name)}>Edytuj nazwę</button>
                <button onClick={this.deleteTrack(track._id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default withTracker(() => ({
  tracks: Tracks.find({ userId: Meteor.userId() }).fetch()
}))(Index);