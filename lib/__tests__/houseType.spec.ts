import { getHouseList } from "@/lib/api";
import { dataItemSchema } from "@/lib/zod";

test("validate getHouseLIst schema", async function () {
  const houseList = await getHouseList();

  expect(Array.isArray(houseList)).toBe(true);
  expect(dataItemSchema.safeParse(houseList[0])).toBeTruthy();
}, 10000);
