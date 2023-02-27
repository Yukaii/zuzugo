import { dispatchAll, notifyLineNotification, notifyLineBotNotification, notifySlackNotification } from "@/lib/notification";
import { fetchNewHousesFn } from "@/lib/tasks";

export const fns = [
  dispatchAll,
  notifyLineNotification,
  notifyLineBotNotification,
  notifySlackNotification,
  fetchNewHousesFn
];
