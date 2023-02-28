import { Client, TextMessage } from '@line/bot-sdk';

// set Channel Access Token and Channel Secret for Line Bot 
const client = new Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

// @todo: pass rent data from api.
const message: TextMessage = {
  type: 'text',
  text: 'Zuzugo got a new house!',
};

// @todo: get groupId from database.
export default function sendLineBotMessage(groupId: string) {
  client.pushMessage(groupId, message)
    .then(() => {
      console.log('訊息發送成功');
    })
    .catch((err) => {
      console.error(`訊息發送失敗：${err}`);
    });
}