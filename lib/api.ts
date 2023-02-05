import * as cheerio from "cheerio";
import { got } from "got";
import { CookieJar } from "tough-cookie";

import { config } from "./config";
import { DataItem, RListAPI } from "./types";

const cookieJar = new CookieJar();

const client = got.extend({
  cookieJar,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  },
});

export async function getToken() {
  const html = await client("https://rent.591.com.tw").text();

  const $ = cheerio.load(html);
  const csrfToken = $('meta[name="csrf-token"]').attr("content");

  if (!csrfToken) {
    console.error(html);
    throw "找不到 csrfToken";
  }

  return csrfToken;
}

export async function getHouseList(): Promise<DataItem[]> {
  const csrfToken = await getToken();
  const houseListURL = config.houseListURL;

  try {
    const data = await client({
      url: houseListURL,
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    }).json();

    const {
      data: { data: houseList },
    } = data as RListAPI;

    return houseList;
  } catch (error) {
    console.error(error);
    throw `Token 可能過期了`;
  }
}
