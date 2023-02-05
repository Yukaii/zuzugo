import { sendLineNotify } from "@/lib/sendLineNotify";

test("Send Line Notify", async () => {
  const resp = await sendLineNotify(`💩`, process.env.LINE_API_TOKEN);
});
