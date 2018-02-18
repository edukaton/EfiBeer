import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default ({ userId }) => 
  <div className="container-fluid" style={{"background": "black", "color": "white", "text-align": "center"}}>
    <p>
      Strona wykonana oraz rozwijana przez grupę EfiBeer.
    </p>
  </div>;
