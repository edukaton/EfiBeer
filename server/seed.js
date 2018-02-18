const Meteor = require('meteor/meteor').Meteor;
const Tracks = require('../imports/api/Tracks').Tracks;
const Cards = require('../imports/api/Cards').Cards;
const lekcja1 = require('../imports/LekcjaNaciagacze');
const lekcja2 = require('../imports/CardContent');

const seedDb = () => {
  Cards.remove({trackId: { $in: Tracks.find({userId: -1}).fetch().map(track => track._id)}});
  Tracks.remove({userId: -1});
  seed(lekcja1, 'Lekcja 1');
  seed(lekcja2, 'Lekcja 2');
}

const seed = (lesson, name) => {
  const trackId = Tracks.insert({
    name,
    createdAt: new Date(),
    userId: -1,
  });
  tranasformLesson(lesson).map(question => {
    Cards.insert(Object.assign(
      {
        createdAt: new Date(),
        trackId, 
      },
      question
    ));
  });
}

const tranasformLesson = lesson => lesson.map(question => {
  question.type = question.type.toLowerCase();
  if (question.answers) {
    if (question.answers.length === 2) {
      question.type = 'truefalse';
    } 
    question.answers = question.answers.sort((a1, a2) => +a2.isCorrect - +a1.isCorrect).map(answer => answer.title).join(',');
  }
  return question;
});

Meteor.methods({
  'seed'() {
    seedDb();
  }
})