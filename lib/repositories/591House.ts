import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { DataItem } from "@/lib/types";

const HOUSE_SOURCE = "591";

export class _591HouseRepository {
  static async insertHouses(houses: DataItem[]) {
    const houseIds = houses.map((house) => String(house.post_id));

    let insertedIds = [] as string[];

    await prisma.$transaction(async (tx) => {
      const existingHouses = await tx.house.findMany({
        where: {
          pk: {
            in: houseIds,
          },
          source: HOUSE_SOURCE,
        },
      });

      const existingHouseIds = existingHouses.map((house) => house.pk);

      const housesToInsert = houses
        .filter((house) => !existingHouseIds.includes(String(house.post_id)))
        .map((house) => ({
          pk: String(house.post_id),
          data: house as unknown as Prisma.JsonObject,
          source: HOUSE_SOURCE,
        }));

      insertedIds = housesToInsert.map((house) => house.pk);

      return tx.house.createMany({
        data: housesToInsert,
      });
    });

    return insertedIds;
  }

  static async getHousesByIds(houseIds: string[]) {
    return prisma.house.findMany({
      where: {
        pk: {
          in: houseIds,
        },
        source: HOUSE_SOURCE,
      },
    });
  }

  static async clearOldRecords() {
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    return prisma.house.deleteMany({
      where: {
        createdAt: {
          lt: twoWeeksAgo,
        },
        source: HOUSE_SOURCE,
      },
    });
  }
}
