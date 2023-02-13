import { houseFactory } from "../../tests/factory";

import { config } from "@/lib/config";
import { sendLineNotify } from "@/lib/sendLineNotify";

test.skip("Send Line Notify", async () => {
  const randomHouse = houseFactory();

  const resp = await sendLineNotify(
    "Test message",
    `${randomHouse.photo_list[0]}`,
    config.tokenLine
  );
});
