import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { authorizeTrack } from './Tracks.js';

const Cards = new Mongo.Collection('cards')

if (Meteor.isServer) {
  Meteor.publish('cards', function tasksPublication() {
    return Cards.find();
  });
}

if (Meteor.isClient) {
  Meteor.autosubscribe(() => {
    Meteor.subscribe('cards');
  });
}

const authorizeCard = (cardId, userId) => {
  const card = Cards.findOne(cardId);
  if (!card) {
    throw new Meteor.Error('not-found');
  }
  authorizeTrack(card.trackId, userId);
}

Meteor.methods({
  'cards.insert'(trackId, data) {
    authorizeTrack(trackId, this.userId);
    Cards.insert(Object.assign(
      {
        createdAt: new Date(),
        trackId, 
      },
      data
    ));
  },
  'cards.remove'(cardId) {
    authorizeCard(cardId, this.userId);
    Cards.remove(trackId);
  },
  'cards.update'(cardId, data) {
    authorizeCard(cardId, this.userId);
    Cards.update(cardId, { $set: data });
  }
});

export {
  Cards,
  authorizeCard
}