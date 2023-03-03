import { SlackAppInstallation } from "@prisma/client";
import { IncomingWebhook } from "@slack/webhook";

import { process591QueryUrl } from "@/lib/591House/utils";
import { inngest } from "@/lib/inngest/client";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

type CommandHandler = (args: {
  webhook: IncomingWebhook;
  args: string;
  installation: SlackAppInstallation;
}) => Promise<void>;

const commandHandlers: Record<string, CommandHandler> = {
  subscribe: async ({ webhook, args, installation }) => {
    const firstNonWhitespace = /^[^\s]+/g;
    const match = args.match(firstNonWhitespace);

    if (!match) {
      throw new Error("No subscribe argument provided");
    }

    const arg = match[0];

    const installationToSubscriptions = await prisma.slackInstallationToSubscription.findMany({
      where: {
        channelId: installation.incomingWebhookChannelId!,
      },
      include: {
        subscription: true,
      },
    });

    switch (arg) {
      case "list": {
        const subscriptionUrls = installationToSubscriptions.map(
          (record) => record.subscription.query
        );

        if (subscriptionUrls.length === 0) {
          await webhook.send({
            text: `You are not subscribed to any queries`,
          });
        } else {
          // TODO: print subscription id to let user unsubscribe
          // Prepend 591 url with https://rent.591.com.tw/
          await webhook.send({
            text: `You are subscribed to the following queries: ${subscriptionUrls.join(", ")}`,
          });
        }

        break;
      }
      default: {
        const query = process591QueryUrl(arg);

        // TODO: Check if query is valid 591 url
        const record = installationToSubscriptions.find(
          (record) => record.subscription.query === query
        );

        if (!record) {
          const subscription = await prisma.houseSubscription.create({
            data: {
              query,
              SlackInstallationToSubscription: {
                create: {
                  channelId: installation.incomingWebhookChannelId!,
                },
              },
            },
          });

          await webhook.send({
            text: `You are now subscribed to ${subscription.query}`,
          });
        }

        break;
      }
    }
  },
  unsubscribe: async ({ webhook }) => {},
  help: async ({ webhook }) => {},
};

export const availableCommands = Object.keys(commandHandlers);

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

    const handler = commandHandlers[command];

    if (!handler) {
      // TODO: Send help message
      throw new Error("No handler found");
    }

    try {
      await handler({ webhook, args, installation });
    } catch (error) {
      console.error(error);

      if (config.slackDevMode) {
        await webhook.send({
          text: `Error: ${error}`,
        });
      }
    }
  }
);
