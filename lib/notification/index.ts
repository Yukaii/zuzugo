import { config } from "../config";
import { DataItem } from "../types";

import { notify as notifyConsole } from "./console";

export function notifyTargets(newHouses: DataItem[]) {
  if (!config.production) {
    notifyConsole(newHouses);
  }

  // TODO: add more notification targets
}
