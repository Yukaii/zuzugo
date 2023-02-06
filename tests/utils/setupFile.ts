import { client } from "@/lib/store";

afterAll(async () => {
  if (client) {
    await client.close();
  }
});
