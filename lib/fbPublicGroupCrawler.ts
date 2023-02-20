import * as cheerio from "cheerio";
import createDOMPurify from "dompurify";
import { bootstrap } from "global-agent";
import { got } from "got";
import { JSDOM } from "jsdom";
import unescape from "lodash/unescape";

import { FacebookGroupPostData, GroupInsight } from "./types";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as any);

if (process.env.GLOBAL_AGENT_HTTP_PROXY) {
  bootstrap();
}

export async function getPosts(groupId: string) {
  const groupUrl = `https://mbasic.facebook.com/groups/${groupId}`;
  const html = await got(groupUrl).then((res) => res.body);

  const $ = cheerio.load(html);

  const postSection = $("#m_group_stories_container");

  const posts = postSection
    .find("> div > div")
    .toArray()
    .map((post) => {
      const rawDataFt = $(post).attr("data-ft");
      const postData = JSON.parse(unescape(rawDataFt) || "{}") as FacebookGroupPostData;

      const author = $(post).find("h3 > span strong:first-child").text();

      const contentParagraphs = $(post).find("div span > p");
      const groupInsight = postData.page_insights[groupId] as GroupInsight;

      let publishTime: number | null = null;

      if (groupInsight) {
        publishTime = groupInsight.post_context.publish_time * 1000;
      }

      const content = contentParagraphs
        .toArray()
        .map((p) => {
          return DOMPurify.sanitize($(p).html()?.replace(/<br>/g, "\n") || "", {
            ALLOWED_TAGS: [],
          });
        })
        .join("\n\n");

      const imageDiv = $(post).find("div > div:last-child");

      let photoUrls: string[] = [];
      if (imageDiv.length) {
        photoUrls = imageDiv
          .find("img")
          .toArray()
          .map((img) => $(img).attr("src") || "")
          .filter(Boolean);
      }

      return {
        id: postData.mf_story_key,
        photoUrls,
        author,
        content,
        publishTime,
        permalink: `https://www.facebook.com/groups/${groupId}/permalink/${postData.mf_story_key}`,
      };
    });

  return posts;
}
