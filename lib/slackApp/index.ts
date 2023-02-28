import { AppRunner, AppRunnerOptions } from "@seratch_/bolt-http-runner";
import { PrismaInstallationStore } from "@seratch_/bolt-prisma";
import { App, AppOptions, LogLevel } from "@slack/bolt";

import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export let appRunner: AppRunner | undefined;

const installationStore = new PrismaInstallationStore({
  // The name `slackAppInstallation` can be different
  // if you use a different name in your Prisma schema
  prismaTable: prisma.slackAppInstallation,
  clientId: process.env.SLACK_CLIENT_ID,
});

export function setupSlackApp(setupApp: (app: App) => void) {
  const isDevMode = config.enableSocketModeForDev;

  if (isDevMode) {
    console.log(
      "⚡️ Bolt app is running with Socket Mode, remember to set up the socket mode in the slack app settings!"
    );
  }

  const baseAppOptions: AppOptions = {
    logLevel: LogLevel.DEBUG,
    token: config.slackBotToken,
    signingSecret: config.slackSigningSecret,
    clientId: config.slackClientId,
    clientSecret: config.slackClientSecret,
    scopes: ["commands", "chat:write"],
    installerOptions: {
      directInstall: true,
    },
    installationStore,
  };

  // before start
  if (!isDevMode) {
    appRunner = new AppRunner(baseAppOptions as AppRunnerOptions);
  }

  let appOptions;
  if (isDevMode) {
    appOptions = {
      ...baseAppOptions,
      socketMode: true,
      appToken: config.slackAppToken,
    };
  } else {
    appOptions = { ...appRunner!.appOptions() };
  }

  const app = new App(appOptions);

  setupApp(app);

  if (isDevMode) {
    app.start().then(() => {
      console.log("⚡️ Bolt app is running with Socket Mode!");
    });
  } else {
    appRunner!.setup(app);
  }
}
