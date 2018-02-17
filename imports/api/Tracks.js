import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
 
const Tracks = new Mongo.Collection('tracks');

if (Meteor.isServer) {
  Meteor.publish('tracks', function tasksPublication() {
    return Tracks.find();
  });
}

const authorizeTrack = (trackId, userId) => {
  if (Tracks.findOne(trackId).userId !== userId) {
    throw new Meteor.Error('not-authorized');
  }
};


Meteor.methods({
  'tracks.insert'(name) {
    if (!this.userId) {
      throw new Meteor.Error('notlogged in');
    }

    Tracks.insert({
      name,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
  'tracks.remove'(trackId) {
    authorizeTrack(trackId, this.userId);
    Tracks.remove(trackId);
  },
  'tracks.update'(trackId, name) {
    authorizeTrack(trackId, this.userId);
    Tracks.update(trackId, { $set: { name } });
  }
});

export {
  Tracks,
  authorizeTrack
};