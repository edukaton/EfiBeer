import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tracks } from '../api/Tracks';

class Index extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeNewTrackName = this.changeNewTrackName.bind(this);
    this.state = {
      newTrackName: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    Meteor.call('tracks.insert', this.state.newTrackName);
    this.setState({
      newTrackName: '',
    })
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
        </form>
        <div>
          Lista ściezek:
          <ul>
            {this.props.tracks.map(track => (
              <li>{track.name}</li>
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