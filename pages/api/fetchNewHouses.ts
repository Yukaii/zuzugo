import type { NextApiRequest, NextApiResponse } from "next";

import { getHouseList } from "@/lib/api";
import { config } from "@/lib/config";
import { notifyTargets } from "@/lib/notification";
import { HouseStore } from "@/lib/store";

const store = new HouseStore({});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // method guard
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { secret: secretFromBody } = req.body;
  const secretFromHeader = req.headers["x-api-secret"];

  const secret = secretFromHeader || secretFromBody;

  if (!config.apiSecret) {
    return res.status(500).json({ message: "API secret is not set" });
  }

  if (secret !== config.apiSecret) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const houses = await getHouseList();
    const newHouses = await store.refreshWithHouses(houses);

    if (newHouses.length > 0) {
      await notifyTargets(newHouses);
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
