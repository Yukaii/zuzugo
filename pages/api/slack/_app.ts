import { setupSlackApp } from "@/lib/slackApp";
export { appRunner } from "@/lib/slackApp";

setupSlackApp((app) => {
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
});
