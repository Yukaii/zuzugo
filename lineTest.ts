import type { NextApiRequest, NextApiResponse } from "next";

import { config } from "@/lib/config";
import { sendLineNotify } from "@/lib/sendLineNotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // method guard
  if (req.method === "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  sendLineNotify(`💩`, config.tokenLine);

  return res.status(200);
}
