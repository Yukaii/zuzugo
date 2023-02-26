import { Db, MongoClient } from "mongodb";

import { DataItem } from "./types";

const MAX_LIST_LENGTH = 100;

type StoreOptions = {
  maxListLength?: number;
  collectionName?: string;
  indexName?: string;
};

export class HouseStore<T, K extends keyof T> {
  private maxListLength: number;
  private client: MongoClient;
  private db: Db;
  private collectionName: string;
  private indexName: K;

  constructor(
    { maxListLength, collectionName, indexName }: StoreOptions = {
      collectionName: "houses",
      indexName: "post_id",
    }
  ) {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    this.db = this.client.db();
    this.maxListLength = maxListLength || MAX_LIST_LENGTH;
    this.collectionName = collectionName || "houses";
    this.indexName = (indexName || "post_id") as K;
  }

  // Insert the new houses ids into list if they are not in the list
  // Store the house data in hash
  // Maintaining up to maxListLength houses data
  async refreshWithHouses(houses: T[]): Promise<T[]> {
    if (!houses.length) {
      return [];
    }

    const houseIds = houses.map((house) => house[this.indexName]);

    const collection = this.db.collection(this.collectionName);

    const session = this.client.startSession();

    let housesToInsert: T[] = [];
    const now = Date.now();

    try {
      await session.withTransaction(async () => {
        const housesInStore = await collection
          .find({ [this.indexName as string]: { $in: houseIds } })
          .toArray();

        const housesInStoreIds = housesInStore.map((house) => house[this.indexName as string]);

        housesToInsert = houses.filter(
          (house) => !housesInStoreIds.includes(house[this.indexName])
        );

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

        const housesToBeRemovedIds = housesToBeRemoved.map(
          (house) => house[this.indexName as string]
        );

        if (housesToBeRemovedIds.length) {
          await collection.deleteMany({ [this.indexName]: { $in: housesToBeRemovedIds } });
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      await session.endSession();
    }

    return housesToInsert;
  }

  async getHouses(): Promise<T[]> {
    const collection = this.db.collection(this.collectionName);

    const houses = await collection.find({}).toArray();

    return houses as T[];
  }

  async clearStore() {
    const collection = this.db.collection(this.collectionName);

    await collection.deleteMany();
  }

  async getWithIds(houseIds: unknown[]): Promise<T[]> {
    const collection = this.db.collection(this.collectionName);

    const housesInStore = await collection
      .find({ [this.indexName as string]: { $in: houseIds } })
      .toArray();

    return housesInStore as T[];
  }

  async disconnect() {
    return this.client.close();
  }
}

export function createDefaultHouseStore() {
  return new HouseStore<DataItem, "post_id">({});
}
