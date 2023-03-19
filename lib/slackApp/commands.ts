import { SlackAppInstallation } from "@prisma/client";
import { IncomingWebhook } from "@slack/webhook";

import { process591QueryUrl } from "@/lib/591House/utils";
import { config } from "@/lib/config";
import { inngest } from "@/lib/inngest/client";
import { prisma } from "@/lib/prisma";
import { Subscriptions } from "@/lib/slackApp/components/Subscriptions";

type CommandHandler = (args: {
  webhook: IncomingWebhook;
  args: string;
  installation: SlackAppInstallation;
}) => Promise<void>;

const commandHandlers: Record<string, CommandHandler> = {
  subscribe: async ({ webhook, args, installation }) => {
    const firstNonWhitespace = /^[^\s]+/g;
    const match = args?.match(firstNonWhitespace);

    if (!match) {
      await webhook.send({
        text: `No subscribe argument provided`,
      });

      return;
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

    // subcommands for /zuzugo subscribe
    switch (arg) {
      case "list": {
        const subscriptions = installationToSubscriptions.map((record) => record.subscription);

        if (subscriptions.length === 0) {
          await webhook.send({
            text: `You are not subscribed to any queries`,
          });
        } else {
          const blocks = Subscriptions({
            subscriptions,
            sectionMessage: "You are subscribed to the following queries:",
          }) as unknown as any[];

          await webhook.send({
            blocks,
          });
        }

        break;
      }
      case "help": {
        commandHandlers.help({ webhook, args, installation });
        break;
      }
      default: {
        const query = process591QueryUrl(arg);

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
  unsubscribe: async ({ webhook, args, installation }) => {
    const firstNonWhitespace = /^[^\s]+/g;
    const match = args?.match(firstNonWhitespace);

    if (!match) {
      await webhook.send({
        text: `No unsubscribe argument provided`,
      });

      return;
    }

    const subscriptionId = match[0];

    try {
      const deletedSubscription = await prisma.houseSubscription.delete({
        where: {
          id: subscriptionId,
        },
      });

      if (config.slackDevMode) {
        console.debug("deletedSubscription", deletedSubscription);
      }
    } catch (error) {
      // no subscription found
      await webhook.send({
        text: `No subscription found with id \`${subscriptionId}\``,
      });
    }

    const installationToSubscriptions = await prisma.slackInstallationToSubscription.findMany({
      where: {
        channelId: installation.incomingWebhookChannelId!,
      },
      include: {
        subscription: true,
      },
    });

    const subscriptions = installationToSubscriptions.map((record) => record.subscription);

    if (subscriptions.length === 0) {
      await webhook.send({
        text: `You are not subscribed to any queries`,
      });
    } else {
      const blocks = Subscriptions({
        subscriptions,
        sectionMessage: "You are still subscribed to the following queries:",
      }) as unknown as any[];

      await webhook.send({
        blocks,
      });
    }
  },
  help: async ({ webhook }) => {
    await webhook.send({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hi there :wave: here are some ideas of what you can do:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Subscribe to queries*\nSubscribe\n`/zuzugo subscribe query`\nShow subscriptions\n`/zuzugo subscribe list`\nUnsubscribe\n`/zuzugo unsubscribe subscriptionId`",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "For more information, visit our documentation:",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Documentation",
              emoji: true,
            },
            url: "https://example.com/docs",
          },
        },
      ],
    });
  },
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
      const helpHandler = commandHandlers.help;

      await helpHandler({ webhook, args, installation });
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
