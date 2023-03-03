import { config } from "@/lib/config";
import { inngest } from "@/lib/inngest/client";
import { setupSlackApp } from "@/lib/slackApp";
import { availableCommands } from "@/lib/slackApp/commands";

export { appRunner } from "@/lib/slackApp";

setupSlackApp((app) => {
  const slashCommand = config.slackSlashCommand || "/zuzugo";

  app.command(slashCommand, async ({ ack, command, say, client, respond }) => {
    if (config.slackDevMode) {
      console.log("Slash command", command);
    }

    // TODO: Add show help command
    const handleInvalidCommand = async () => {
      await client.chat.postEphemeral({
        channel: command.channel_id,
        text: "Invalid command",
        user: command.user_id,
      });

      ack();
    };

    const { text } = command;
    const regex = /(?<cmd>\w+)(?:\s+(?<args>.*))?/;
    const match = text.match(regex);

    if (!match) {
      return handleInvalidCommand();
    }

    const { cmd, args } = match.groups as { cmd: string; args: string };
    if (!availableCommands.includes(cmd)) {
      return handleInvalidCommand();
    }

    await inngest.send("slackCommands/slashHandler", {
      data: {
        channelId: command.channel_id,
        command: cmd,
        args,
        userId: command.user_id,
      },
    });

    await ack({
      response_type: "in_channel",
    });
  });
});
