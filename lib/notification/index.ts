import { config } from "../config";
import { inngest } from "../inngest/client";
import { _591HouseRepository } from "../repositories/591House";
import { DataItem } from "../types";

import { notify as notifyConsole } from "./console";
import { notify as notifyLine } from "./line";
import { notify as notifySlack } from "./slack";

export async function notifyTargets(newHouses: DataItem[]) {
  if (!config.production) {
    notifyConsole(newHouses);
  }

  await inngest.send("notification/dispatchAll", {
    data: {
      houseIds: newHouses.map((house) => String(house.post_id)),
    },
  });
}

export const dispatchAll = inngest.createFunction(
  "Notify targets",
  "notification/dispatchAll",
  async ({ event }) => {
    await inngest.send("notification/notifyLine", {
      data: event.data,
    });

    await inngest.send("notification/notifySlack", {
      data: event.data,
    });
  }
);

export const notifyLineNotification = inngest.createFunction(
  "Notify Line",
  "notification/notifyLine",
  async ({ event }) => {
    const houses = await _591HouseRepository.getHousesByIds(event.data.houseIds);

    try {
      await notifyLine(houses.map((house) => house.data as DataItem));
    } catch (error) {
      console.error(error);
    }
  }
);

export const notifySlackNotification = inngest.createFunction(
  "Notify Slack",
  "notification/notifySlack",
  async ({ event }) => {
    const houses = await _591HouseRepository.getHousesByIds(event.data.houseIds);

    try {
      await notifySlack(houses.map((house) => house.data as DataItem));
    } catch (error) {
      console.error(error);
    }
  }
);
