'use strict';

const _ = require('lodash');
const state = require('./state');

let v =
  state('トップ画面へ');
//state('残高照会');
console.log('name = ' + v.name);

let keys = v.keyboards;
_.each(keys, k => {
  console.log('key = ' + k);
});
