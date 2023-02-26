import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { _591HouseRepository } from "@/lib/repositories/591House";
import { houseFactory } from "@/tests/factory";

test("it should insert houses", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  await _591HouseRepository.insertHouses(houses);

  const insertedHouses = await _591HouseRepository.getHousesByIds(
    houses.map((house) => String(house.post_id))
  );

  expect(insertedHouses.length).toBe(houses.length);
});

test("it should clear old records", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  await _591HouseRepository.insertHouses(houses);

  const oneMonthAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  // update houses created at to one month ago
  await prisma.house.updateMany({
    where: {
      pk: {
        in: houses.map((house) => String(house.post_id)),
      },
    },
    data: {
      createdAt: oneMonthAgo,
    },
  });

  await _591HouseRepository.clearOldRecords();

  const insertedHouses = await _591HouseRepository.getHousesByIds(
    houses.map((house) => String(house.post_id))
  );

  expect(insertedHouses.length).toBe(0);
});

test("it can read data from the record", async function () {
  const house = houseFactory();

  await _591HouseRepository.insertHouses([house]);

  const insertedHouses = await _591HouseRepository.getHousesByIds([String(house.post_id)]);
  const insertedHouse = insertedHouses[0];

  expect(insertedHouse.data as Prisma.JsonObject).toHaveProperty("post_id", house.post_id);
});

it("should return empty array if no new houses is inserted", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  await _591HouseRepository.insertHouses(houses);

  const newHouses = await _591HouseRepository.insertHouses(houses);

  expect(newHouses.length).toBe(0);
});

it("should only return newly inserted house ids", async function () {
  const houses = Array.from({ length: 10 }, houseFactory);

  await _591HouseRepository.insertHouses(houses);

  const newHouses = Array.from({ length: 10 }, houseFactory);
  const randomPickedOldHouses = houses.slice(0, 5);

  const allHousesToInsert = [...newHouses, ...randomPickedOldHouses];

  const newHouseIds = await _591HouseRepository.insertHouses(allHousesToInsert);

  expect(newHouseIds.length).toBe(newHouses.length);
});
