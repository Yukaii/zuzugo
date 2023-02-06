import { config } from "../config";
import { DataItem } from "../types";

import { notify as notifyConsole } from "./console";
import { notify as notifyLine } from "./line";
import { notify as notifySlack } from "./slack";

export async function notifyTargets(newHouses: DataItem[]) {
  if (!config.production) {
    notifyConsole(newHouses);
  }

  await notifySlack(newHouses);
  await notifyLine(newHouses);
}
