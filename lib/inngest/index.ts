import { dispatchAll, notifyLineNotification, notifySlackNotification } from "@/lib/notification";
import { fetchNewHousesFn } from "@/lib/tasks";

export const fns = [dispatchAll, notifyLineNotification, notifySlackNotification, fetchNewHousesFn];
