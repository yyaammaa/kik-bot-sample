'use strict';

const _ = require('lodash');
const states = require('./states');

const Scs = states.Screens;
states.getScreenByName(Scs.Zandaka, (text, keyboards) => {
  console.log(text);
  _.each(keyboards, key => {
    console.log(key);
  });
});

