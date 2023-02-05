import { config } from "../config";
import { DataItem } from "../types";

import { notify as notifyConsole } from "./console";
import { notify as notifySlack } from "./slack";

export async function notifyTargets(newHouses: DataItem[]) {
  if (!config.production) {
    notifyConsole(newHouses);
  }

  // TODO: add more notification targets
  await notifySlack(newHouses);
}
