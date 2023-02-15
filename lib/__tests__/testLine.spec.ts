import { houseFactory } from "../../tests/factory";

import { sendLineNotify } from "@/lib/sendLineNotify";

test.skip("Send Line Notify", async () => {
  const randomHouse = houseFactory();

  const resp = await sendLineNotify("Test message", `${randomHouse.photo_list[0]}`);
});
