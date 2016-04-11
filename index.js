'use strict';

// https://github.com/kikinteractive/kik-node#your-first-echo-bot

let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
const config = require('./config');

const apiKey = config('KIK_API_KEY');
if (!apiKey) {
  console.log('no api key');
  return;
}

console.log('api key = ' + apiKey);

// Configure the bot API endpoint, details for your bot
//   --> https://kik-bot-sample.herokuapp.com/incoming をconfigしないと動かないので注意な
let bot = new Bot({
  username: 'yamatest',
  apiKey: apiKey,
  baseUrl: 'https://kik-bot-sample.herokuapp.com'
});

bot.onTextMessage((message) => {
  console.log('onTextMessage: ' + JSON.parse(message));
  message.reply(message.body);
});

bot.onStartChattingMessage((incoming) => {
  console.log('onStartChattingMessage: ' + incoming);
});

// process.env.PORT を無視して8080とか設定してもremoteでは動かないので注意な
const port = process.env.PORT || 8080;
let server = http
  .createServer(bot.incoming())
  .listen(port, () => {
    console.log('server running on port: ' + port);
  });

// const express = require('express');
// const bodyParser = require('body-parser');
// const config = require('./config');

// let bot = require('./bot');
// let app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// app.get('/', (request, response) => {
//   console.log('/ get');

//   //let message = config('SLACK_TOKEN');
//   //response.json({
//   //    "hello": "world",
//   //    "message": message
//   //  }
//   //)

//   response.send('yo');
// });

// app.listen(app.get('port'), (err) => {
//   if (err) throw err;

//   console.log('Node app is running on port', app.get('port'));

// //   const token = config('SLACK_TOKEN');
// //   if (token) {
// //     //console.log('slack token = ' + token);
// //     bot.listen({token: config('SLACK_TOKEN')})
// //   } else {
// //     console.log('Oops! no slack token available.');
// //   }
// });