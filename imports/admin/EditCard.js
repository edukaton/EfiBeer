import React from 'react';
import CardForm from './CardForm';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router'
import { withTracker } from 'meteor/react-meteor-data';
import { Cards, authorizeCard } from '../api/Cards';

const EditCard = ({card, match, history}) => card ? <div>
    <CardForm
      onSubmit={data => {
        Meteor.call('cards.update', card._id, data);
        history.push(`/admin/track/${match.params.trackId}`);
      }}
      card={card}
    />
  </div> : null;


export default withTracker(({match}) => {
  Meteor.subscribe('cards');
  const card = Cards.findOne(match.params.cardId);
  if (card) {
    authorizeCard(match.params.cardId, Meteor.userId());
  }
  return {
    card,
  };
})(EditCard);