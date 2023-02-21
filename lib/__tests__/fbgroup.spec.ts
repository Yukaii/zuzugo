import { getPosts } from "@/lib/fbPublicGroupCrawler";

test("getPostList should return array of post data", async function () {
  // https://mbasic.facebook.com/groups/464870710346711
  const posts = await getPosts("464870710346711");

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  const post = posts[0];

  expect(post).toHaveProperty("id");
  expect(post).toHaveProperty("photoUrls");
  expect(post).toHaveProperty("author");
  expect(post).toHaveProperty("content");
  expect(post).toHaveProperty("publishTime");

  expect(typeof post.id).toBe("string");
  expect(Array.isArray(post.photoUrls)).toBe(true);
  expect(typeof post.author).toBe("string");
  expect(typeof post.content).toBe("string");
  expect(typeof post.publishTime).toBe("number");
});
