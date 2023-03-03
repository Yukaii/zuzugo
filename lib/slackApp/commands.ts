import { IncomingWebhook } from "@slack/webhook";

import { inngest } from "@/lib/inngest/client";
import { prisma } from "@/lib/prisma";

export const availableCommands = ["subscribe", "unsubscribe", "help"];

export const slashCommand = inngest.createFunction(
  "Subscribe command",
  "slackCommands/slashHandler",
  async ({ event }) => {
    const { channelId, userId, command, args } = event.data;

    const installation = await prisma.slackAppInstallation.findFirst({
      where: {
        incomingWebhookChannelId: channelId,
        userId,
      },
    });

    if (!installation || !installation.incomingWebhookUrl) {
      throw new Error("No installation found");
    }

    const webhook = new IncomingWebhook(installation.incomingWebhookUrl!);

    await webhook.send({
      text: `You subscribed`,
    });
  }
);
