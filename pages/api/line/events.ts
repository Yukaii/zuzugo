import { WebhookEvent, User, Group, Room } from "@line/bot-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import sendLineBotMessage from 'lib/notification/lineBot'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "POST") {
    res.status(405).json({ error: "Sorry! This endpoint does not accept your requests." });
    return;
  }

  const events: WebhookEvent[] = req.body.events;
  const [firstEvent] = events;

  if (firstEvent.type === 'join') {
    const {
      userId = '',
      groupId = '',
      roomId = '',
      // @todo: save chatType to database.
      // type: chatType,
    } = firstEvent.source as User & Group & Room;

    const chatId = userId || groupId || roomId;
    await sendLineBotMessage(chatId)
  }

  res.send(200)
}