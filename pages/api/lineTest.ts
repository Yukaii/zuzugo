import type { NextApiRequest, NextApiResponse } from "next";

import { sendLineNotify } from "@/lib/sendLineNotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // method guard
  if (req.method === "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  sendLineNotify(`💩`, process.env.LINE_API_TOKEN);

  return res.status(200);
}
