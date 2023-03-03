import { config } from "@/lib/config";
import { dispatchAll, notifyLineNotification, notifySlackNotification } from "@/lib/notification";
import { slashCommand } from "@/lib/slackApp/commands";
import { fetchNewHousesFn, fetchNewHousesEvent } from "@/lib/tasks";

export const fns = [
  dispatchAll,
  notifyLineNotification,
  notifySlackNotification,
  config.cronEnabled ? fetchNewHousesFn : null,
  fetchNewHousesEvent,

  // slack commands
  slashCommand,
].filter(Boolean);
