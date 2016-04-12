'use strict';

// https://github.com/kikinteractive/kik-node#your-first-echo-bot

let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');
const config = require('./config');
const States = require('./states');

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

// TODO: 簡単に動作確認する方法
bot.onStartChattingMessage((message) => {
  console.log('onStartChattingMessage');
  send(States.Screens.WELCOME, message);
});

bot.onTextMessage((message) => {
  console.log('onTextMessage: ' + JSON.stringify(message));
  send(message.body, message);
});

function send(name, message) {
  States.getScreenByName(name, (text, link, keyboards) => {
    // グループとかで呼ばれた場合は拒否する
    let participants = message.participants;
    if (!participants || participants.length > 1) {
      console.log('sorry, but this bot is 1on1 only');
      return;
    }

    let messages = [];
    let textMessage = Bot.Message.text(text);
    if (keyboards) {
      textMessage.addResponseKeyboard(keyboards);
    }
    messages.push(textMessage);

    if (link) {
      let linkMessage = Bot.Message.link(link);
      messages.push(linkMessage);
      if (keyboards) {
        linkMessage.addResponseKeyboard(keyboards);
      }
    }

    bot.send(messages, message.from, message.chatId);
  });
}

// process.env.PORT を無視して8080とか設定してもherokuでは動かないので注意な
const port = process.env.PORT || 8080;
let server = http
  .createServer(bot.incoming())
  .listen(port, () => {
    console.log('server running on port: ' + port);
  });
