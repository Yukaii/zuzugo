import { getToken, getHouseList } from "@/lib/api";
import { server } from "@/tests/mocks/server";

if (!process.env.ZUZUGO_TEST_REALWORLD) {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}

test("getToken should return string results", async function () {
  const csrfToken = await getToken();

  expect(typeof csrfToken).toBe("string");
}, 10000);

test("getHouseList should return array of house data", async function () {
  const houseList = await getHouseList();

  expect(Array.isArray(houseList)).toBe(true);
}, 10000);
