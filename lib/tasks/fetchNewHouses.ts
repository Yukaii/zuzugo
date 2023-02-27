import { getHouseList } from "@/lib/api";
import { config } from "@/lib/config";
import { inngest } from "@/lib/inngest/client";
import { notify as notifyConsole } from "@/lib/notification/console";
import { _591HouseRepository } from "@/lib/repositories/591House";

async function fetchAndSaveNewHouses() {
  const houses = await getHouseList();

  if (!config.production) {
    notifyConsole(houses);
  }

  const houseIds = await _591HouseRepository.insertHouses(houses);

  if (houseIds.length > 0) {
    await inngest.send("notification/dispatchAll", {
      data: {
        houseIds,
      },
    });
  }
}

export const fetchNewHousesFn = inngest.createFunction(
  { name: "Fetch New Houses" },
  {
    // every 5 minutes
    cron: "*/5 * * * *",
  },
  async () => {
    await fetchAndSaveNewHouses();
  }
);
