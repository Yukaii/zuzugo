import { getHouseList } from "@/lib/api";
import { dataItemSchema } from "@/lib/zod";

test("getHouseList should return array of house data", async function () {
  const houseList = await getHouseList();

  expect(Array.isArray(houseList)).toBe(true);
  expect(dataItemSchema.safeParse(houseList[0])).toBeTruthy();
}, 10000);
