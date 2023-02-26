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

  return _591HouseRepository.insertHouses(houses);
}

export const fetchNewHousesFn = inngest.createFunction(
  { name: "Fetch New Houses" },
  {
    // every 5 minutes
    cron: "*/5 * * * *",
  },
  async () => {
    const houseIds = await fetchAndSaveNewHouses();

    if (config.newNotificationSystem) {
      await inngest.send("notification/dispatchAll", {
        data: {
          houseIds,
        },
      });
    }
  }
);
