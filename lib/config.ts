import url from "url";

import { AppOptions } from "@slack/bolt";

export function extractSearchParams(urlString: string) {
  const parsedUrl = url.parse(urlString);
  return parsedUrl.search || "";
}

export function appendRentalAPIParams(urlString: string) {
  const searchParams = new URLSearchParams(urlString);

  searchParams.set("is_format_data", "1");
  searchParams.set("is_new_list", "1");
  searchParams.set("type", "1");

  return searchParams.toString();
}

const targetURL = process.env.TARGET_URL || "";
const search = extractSearchParams(targetURL);

const houseListURL = `https://rent.591.com.tw/home/search/rsList?${appendRentalAPIParams(search)}`;

const apiSecret = process.env.ZUZUGO_API_SECRET;

const tokenLine = process.env.LINE_API_TOKEN;

// const isSubwayStationFilterEnabled = process.env.ENABLE_SUBWAY_STATION_FILTER === "true";
// const subwayStation = JSON.parse(process.env.SUBWAY_STATION_FILTER);
// const subwayStationDistance = parseInt(process.env.SUBWAY_STATION_FILTER_DISTANCE, 10) || 1000;

const slackWebhook = process.env.SLACK_WEBHOOK!;

export const config = {
  houseListURL,
  // subwayStationFilter: {
  //   enable: isSubwayStationFilterEnabled,
  //   station: subwayStation,
  //   distance: subwayStationDistance,
  // },
  slackWebhook,
  slackAppToken: process.env.SLACK_APP_TOKEN,
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
  enableSocketModeForDev: process.env.ENABLE_SOCKET_MODE_FOR_DEV === "true",
  apiSecret,
  tokenLine,
  production: process.env.NODE_ENV === "production",
};
