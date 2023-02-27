import type { NextApiRequest, NextApiResponse } from "next";

import { appRunner } from "./_app";

import { config as applicationConfig } from "@/lib/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Sorry! This endpoint does not accept your requests." });
    return;
  }

  if (applicationConfig.enableSocketModeForDev) {
    return res.status(200).json({ ok: true });
  } else {
    await appRunner?.handleEvents(req, res);
  }
}
