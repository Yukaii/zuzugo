import type { NextApiRequest, NextApiResponse } from "next";

import { appRunner } from "./_app";

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
  await appRunner.handleEvents(req, res);
}
