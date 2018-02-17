import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tracks } from '../api/Tracks';
import { Link } from 'react-router-dom';

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
      <div className="container">
        <h2 className="text-center">Witaj w edytorze lekcji</h2><br />
        <form onSubmit={this.handleSubmit}>
        <p>Wpisz nazwę lekcji:</p>
        <div className="input-group">
          <input
            type="text"
            className = "form-control"
            placeholder="nazwa lekcji"
            value={this.state.newTrackName}
            onChange={this.changeNewTrackName}
          />
          <button className="btn btn-success btn-block">Wyślij</button>
          </div>
          {this.state.editingTrackId && (
            <button
              type="button"
              onClick={this.reset}
              className = "btn btn-success btn-block"
            >
              Resetuj
            </button>
          )}
        </form>
        <div>
        <br />
          <h4 className = "text-center">Lista ściezek:</h4>
          <br />
          <table className = "table table-hover">
            {this.props.tracks.map(track => (
              <tr>
                <td>
                <Link to={`/admin/track/${track._id}`}>{track.name}</Link>
                
                </td>
                <td>
                <button onClick={this.changeEditingTrackId(track._id, track.name)} className="btn-warning">Edytuj nazwę</button>
                </td>
                <td>
                <button onClick={this.deleteTrack(track._id)} className="btn-danger">Usuń</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

export default withTracker(() => ({
  tracks: Tracks.find({ userId: Meteor.userId() }).fetch()
}))(Index);