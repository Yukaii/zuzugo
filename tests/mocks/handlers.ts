import { rest } from "msw";

import { config } from "@/lib/config";
import rsList from "@/tests/fixtures/rsList.json";

const houseListURL = config.houseListURL;

export const handlers = [
  rest.get("https://rent.591.com.tw", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text('<meta name="csrf-token" content="uC9EMNpcOACJVtvcPq090jzDIVv4bzJex4TmXGEd" />')
    );
  }),

  rest.get(houseListURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rsList));
  }),
];
