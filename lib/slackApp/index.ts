import { AppRunner, AppRunnerOptions } from "@seratch_/bolt-http-runner";
import { PrismaInstallationStore } from "@seratch_/bolt-prisma";
import { App, AppOptions, LogLevel } from "@slack/bolt";

import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export let appRunner: AppRunner | undefined;

export const installationStore = new PrismaInstallationStore({
  // The name `slackAppInstallation` can be different
  // if you use a different name in your Prisma schema
  prismaTable: prisma.slackAppInstallation,
  clientId: process.env.SLACK_CLIENT_ID,
});

export function setupSlackApp(setupApp: (app: App) => void) {
  const isDevMode = config.slackDevMode;

  if (isDevMode) {
    console.log(
      "⚡️ Bolt app is running with Socket Mode, remember to set up the socket mode in the slack app settings!"
    );
  }

  const baseAppOptions: AppOptions = {
    logLevel: config.slackDevMode ? LogLevel.INFO : LogLevel.DEBUG,
    signingSecret: config.slackSigningSecret,
    clientId: config.slackClientId,
    clientSecret: config.slackClientSecret,
    stateSecret: config.slackStateSecret,
    scopes: [
      "commands",
      "incoming-webhook",
      "chat:write",
      "chat:write.public",
      "chat:write.customize",
    ],
    installerOptions: {
      directInstall: true,
      callbackOptions: {
        success(success, installOptions, req, res) {
          // redirect to the app home page
          res
            .writeHead(302, {
              Location: "/auth/signin?target=slack",
            })
            .end();
        },
      },
    },
    installationStore,
    redirectUri: config.slackRedirectUri,
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
