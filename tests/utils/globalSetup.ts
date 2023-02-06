import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import { config } from "./mongoConfig";

export default async function globalSetup() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.MONGODB_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db(config.Database);
  await db.dropDatabase();
  await client.close();
}
