import React from 'react';
import CardForm from './CardForm';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default ({match, history}) => <div>
    <CardForm
      onSubmit={data => {
        Meteor.call('cards.insert', match.params.trackId, data);
        history.push(`/admin/track/${match.params.trackId}`);
      }}
      backUrl={`/admin/track/${match.params.trackId}`}
    />
  </div>
