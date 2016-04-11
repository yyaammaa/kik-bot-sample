'use strict';

const _ = require('lodash');

const errorName = 'エラー！';
const topName = 'トップ画面へ';
const zandakaName = '残高照会';
const furikomiName = '振込・振替';

const errorState = {
  name: errorName,
  keyboards: [zandakaName, furikomiName]
};

const top = {
  name: topName,
  keyboards: [zandakaName, furikomiName]
};

const zandaka = {
  name: zandakaName,
  keyboards: [topName]
};

const furikomi = {
  name: furikomiName,
  keyboards: [topName]
};

module.exports = (name) => {
  const states = [top, zandaka, furikomi];
  let state = null;
  _.each(states, st => {
    if (name === st.name) {
      state = st;
      return false;
    }
  });

  if (!state) {
    state = top;
  }

  return state;

  //let index = states.indexOf(name);
  //if (index < 0) {
  //  return errorState;
  //}
  //
  //return states[index];
};