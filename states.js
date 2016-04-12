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
    OnePass: 'ワンタイムパスワード'
  },

  /**
   *
   * @param name 必須
   * @param callback(text, [keyboards]) 必須
   */
  getScreenByName(name, callback){
    let screenText = name || '';
    let text;
    let keyboards;

    switch (screenText) {
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
          this.Screens.OnePass
        ];
        break;
    }

    callback(text, keyboards);
  }

};


