export const helpMessage = {
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
        url: "https://github.com/Yukaii/zuzugo/blob/main/docs/CommandHelp.md",
      },
    },
  ],
};
