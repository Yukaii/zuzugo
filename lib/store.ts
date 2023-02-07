import { Db, MongoClient } from "mongodb";

import { DataItem } from "./types";

const MAX_LIST_LENGTH = 100;

export class HouseStore {
  private maxListLength: number;
  private client: MongoClient;
  private db: Db;

  constructor({ maxListLength }: { maxListLength?: number } = {}) {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    this.db = this.client.db();
    this.maxListLength = maxListLength || MAX_LIST_LENGTH;
  }

  // Insert the new houses ids into list if they are not in the list
  // Store the house data in hash
  // Maintaining up to maxListLength houses data
  async refreshWithHouses(houses: DataItem[]): Promise<DataItem[]> {
    if (!houses.length) {
      return [];
    }

    const houseIds = houses.map((house) => house.post_id);

    const collection = this.db.collection("houses");

    const session = this.client.startSession();

    let housesToInsert: DataItem[] = [];
    const now = Date.now();

    try {
      await session.withTransaction(async () => {
        const housesInStore = await collection.find({ post_id: { $in: houseIds } }).toArray();

        const housesInStoreIds = housesInStore.map((house) => house.post_id);

        housesToInsert = houses.filter((house) => !housesInStoreIds.includes(house.post_id));

        if (housesToInsert.length) {
          await collection.insertMany(
            housesToInsert.map((house) => ({ ...house, createdAt: now }))
          );
        }

        const housesToBeRemoved = await collection
          .find({})
          .sort({
            createdAt: -1,
          })
          .skip(this.maxListLength)
          .toArray();

        const housesToBeRemovedIds = housesToBeRemoved.map((house) => house.post_id);

        if (housesToBeRemovedIds.length) {
          await collection.deleteMany({ post_id: { $in: housesToBeRemovedIds } });
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      await session.endSession();
    }

    return housesToInsert;
  }

  async getHouses(): Promise<DataItem[]> {
    const collection = this.db.collection("houses");

    const houses = await collection.find({}).toArray();

    return houses as unknown as DataItem[];
  }

  async clearStore() {
    const collection = this.db.collection("houses");

    await collection.deleteMany();
  }

  async disconnect() {
    return this.client.close();
  }
}
