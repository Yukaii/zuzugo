import { getToken, getHouseList } from "@/lib/api";

test("getToken should return string results", async function () {
  const csrfToken = await getToken();

  expect(typeof csrfToken).toBe("string");
}, 10000);

test("getHouseList should return array of house data", async function () {
  const houseList = await getHouseList();

  expect(Array.isArray(houseList)).toBe(true);
}, 10000);
