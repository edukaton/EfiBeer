import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracks } from './api/Tracks';
import { Cards  } from './api/Cards';
import SingleCard from './SingleCard.js';

class Track extends Component {
  constructor(props) {
    super(props);

    this.incrementStage = this.incrementStage.bind(this);

    this.state = {
      stage: 0,
    };
  }

  incrementStage() {
    if (this.state.stage >= this.props.cardList.length) {
      this.props.history.push('/');
    } else {
      this.setState({
        stage: this.state.stage + 1,
      });
    }
  }

  render() {
    if (!this.props.track) {
      return null;
    }
    return <SingleCard
      card={this.props.cardList[this.state.stage]}
      isLast={this.state.stage >= this.props.cardList.length - 1}
      incrementStage={this.incrementStage}
    />
  }
}

export default withTracker(({match}) => ({
  track: Tracks.findOne(match.params.trackId),
  cardList: Cards.find({ trackId: match.params.trackId }).fetch()
}))(Track);