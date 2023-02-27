import { Client,TextMessage } from '@line/bot-sdk';

// 設定 Line Bot 的 Channel Access Token 和 Channel Secret
const client = new Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

// 建立訊息並發送
const message:TextMessage = {
  type: 'text',
  text: '本週的訓練課程為 Python 程式設計，請記得準時出席。',
};



export function sendLineBotMessage (){
console.log('sendLineBotMessage :', sendLineBotMessage);
  client.broadcast(message)
  .then(() => {
    console.log('訊息發送成功');
  })
  .catch((err) => {
    console.error(`訊息發送失敗：${err}`);
  });

}