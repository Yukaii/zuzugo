import { getHouseList } from "@/lib/api";
import { inngest } from "@/lib/inngest/client";
import { _591HouseRepository } from "@/lib/repositories/591House";

async function fetchAndSaveNewHouses() {
  const houses = await getHouseList();
  await _591HouseRepository.insertHouses(houses);
}

export const fetchNewHousesFn = inngest.createFunction(
  "Fetch New Houses",
  {
    event: "tasks/fetchNewHouses",
    // every 5 minutes
    cron: "*/5 * * * *",
  },
  async () => {
    await fetchAndSaveNewHouses();

    // TODO: call notifyAll
  }
);
