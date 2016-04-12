'use strict';

const _ = require('lodash');
//const keyMirror = require('keyMirror');

module.exports = {

  //Screens: keyMirror({
  //  TOP: null,
  //  Zandaka: null
  //}),

  Screens: {
    TOP: 'トップ画面',
    Zandaka: '残高照会',
    Meisai: '入出金明細',
    OnePass: 'ワンタイムパスワード',
    Otoku: 'お得な情報'
  },

  /**
   *
   * @param name 必須
   * @param callback(text, [link], [[keyboards]]) 必須
   */
  getScreenByName(name, callback){
    let screenText = name || '';
    let text;
    let link;
    let keyboards;

    switch (screenText) {
      case this.Screens.Otoku:
        text = '【トクする春の大感謝祭!!】\n\n現金・ポイント・ギフトがもらえるチャンス！\n2016年2月1日（月）～2016年4月30日(土)\n\n詳しくはこちら ↓';
        link = 'http://www.resonabank.co.jp/kojin/cam/detail/1602_spring/index.html';
        keyboards = [
          this.Screens.Zandaka,
          this.Screens.Meisai,
          this.Screens.OnePass,
        ];
        break;
      case this.Screens.Meisai:
        text = 'tbdです';
        keyboards = [
          this.Screens.Zandaka,
          this.Screens.OnePass,
          this.Screens.TOP
        ];
        break;
      case this.Screens.OnePass:
        text = 'モバイルバンキング用のワンタイムパスワードは\n\n2874927\n\nです。有効期限は12:39までです。';
        keyboards = [
          this.Screens.Zandaka,
          this.Screens.Meisai
        ];
        break;
      case this.Screens.Zandaka:
        text = '現在の残高は 2,894,829円 です。';
        keyboards = [
          this.Screens.Meisai,
          this.Screens.OnePass
        ];
        break;
      case this.Screens.TOP:
      default:
        text = 'ようこそ。下のボタンから選択してください。';
        keyboards = [
          this.Screens.Zandaka,
          this.Screens.Meisai,
          this.Screens.OnePass,
          this.Screens.Otoku
        ];
        break;
    }

    callback(text, link, keyboards);
  }

};


