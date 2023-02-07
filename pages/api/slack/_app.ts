import { AppRunner } from "@seratch_/bolt-http-runner";
import { App, LogLevel } from "@slack/bolt";

export const appRunner = new AppRunner({
  logLevel: LogLevel.DEBUG,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  scopes: ["commands", "chat:write"],
});

const app = new App(appRunner.appOptions());

app.command("/zuzugo", async ({ ack, command, say, client }) => {
  console.log(command.text);

  await client.chat.postMessage({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Hello*, _World!_",
        },
      },
    ],
    channel: command.channel_id,
  });

  ack();
});

appRunner.setup(app);
