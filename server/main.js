import { Meteor } from 'meteor/meteor';
import { Tracks } from '../imports/api/Tracks';
import { Cards } from '../imports/api/Cards';
import lekcja1 from '../imports/LekcjaNaciagacze';
import lekcja2 from '../imports/CardContent';

Meteor.startup(() => {
  const isSeeded = Tracks.find({userId: -1}).count() > 1;
  if (!isSeeded) {
    seed(lekcja1, 'Lekcja 1');
    seed(lekcja2, 'Lekcja 2');
  }
});

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
  if (question.answers) {
    question.answers = question.answers.sort((a1, a2) => +a2.isCorrect - +a1.isCorrect).map(answer => answer.title).join(',');
  }
  return question;
});
