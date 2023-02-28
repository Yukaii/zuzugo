import { rest } from "msw";

import rsList from "@/tests/fixtures/rsList.json";

export const handlers = [
  rest.get("https://rent.591.com.tw", (req, res, ctx) => {
    return res(ctx.json(rsList));
  }),
];
