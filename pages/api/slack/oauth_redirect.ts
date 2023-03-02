import type { NextApiRequest, NextApiResponse } from "next";

import { appRunner } from "./_app";

import { config } from "@/lib/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Sorry! This endpoint does not accept your requests." });
    return;
  }

  if (config.slackDevMode) {
    return res.status(200).json({ ok: true });
  } else {
    await appRunner?.handleCallback(req, res);
  }
}
