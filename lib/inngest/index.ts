import { Inngest } from "inngest";

export const inngest = new Inngest({
  name: "Zuzugo",
});

const myFn = inngest.createFunction("My BG Fn", "your.event.name", async ({ event }) => {
  return "hello!";
});

export const fns = [myFn];
