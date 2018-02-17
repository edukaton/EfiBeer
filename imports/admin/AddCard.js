import React from 'react';
import CardForm from './CardForm';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router'

export default ({history}) => <div>
    <CardForm
      onSubmit={data => {
        Meteor.call('cards.insert', data);
        history.push(`/admin/track/${match.trackId}`);
      }}
    />
  </div>
