import { houseFactory } from "./factory";

import { HouseStore, client } from "@/lib/store";

const store = new HouseStore({});

test("should run #refreshWithHouses", async function () {
  await store.refreshWithHouses([]);
});

test("should store latest houses", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  await store.clearStore();

  await store.refreshWithHouses(houses);

  const listFromStore = await store.getHouses();

  expect(listFromStore.every((h) => houses.find((house) => house.post_id === h.post_id))).toBe(
    true
  );
});

test("should deduplicate based on post_id", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);
  await store.clearStore();

  await store.refreshWithHouses(houses);
  await store.refreshWithHouses(houses);

  const listFromStore = await store.getHouses();

  expect(listFromStore.length).toBe(houses.length);
});

test("should maintain up to maxListLength houses", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  const limitStore = new HouseStore({ maxListLength: 5 });

  await limitStore.clearStore();

  await limitStore.refreshWithHouses(houses);

  const listFromStore = await limitStore.getHouses();

  expect(listFromStore.length).toBe(5);
});

test("should refresh new houses to the top of the list", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);
  await store.clearStore();

  await store.refreshWithHouses(houses);

  const newHouses = Array.from({ length: 5 }, houseFactory);

  await store.refreshWithHouses(newHouses);

  const listFromStore = await store.getHouses();

  expect(newHouses.every((h) => listFromStore.find((house) => house.post_id === h.post_id))).toBe(
    true
  );
});

afterAll(async function () {
  return client.close();
});
