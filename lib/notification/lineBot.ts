import { Client, TextMessage } from '@line/bot-sdk';

import { config } from 'lib/config'
// set Channel Access Token and Channel Secret for Line Bot 
const client = new Client({
  channelAccessToken: config.line.LINE_ACCESS_TOKEN || '',
  channelSecret: config.line.LINE_CHANNEL_SECRET,
});

// @todo: pass rent data from api.
const message: TextMessage = {
  type: 'text',
  text: 'Zuzugo got a new house!',
};

// @todo: get groupId from database.
export default async function sendLineBotMessage(groupId: string) {
  await client.pushMessage(groupId, message)
}